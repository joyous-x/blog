package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

/*
run:
	go run h2server.go -t h2c
*/

/*
创建CA证书和你的服务器使用的证书
	a、创建CA证书
		$ openssl genrsa -out rootCA.key 2048
		$ openssl req -x509 -new -nodes -key rootCA.key -days 1024 -out rootCA.pem
	b、创建证书
		$ openssl genrsa -out server.key 2048
		$ openssl req -new -key server.key -out server.csr
		$ openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500
*/

//> Go 在 1.6的时候已经支持 HTTP/2 了， 1.8 开始支持PUSH功能。
//> Go的http/2使用也非常简单，但是必须和TLS一起使用。
func htt2Server(https bool) error {
	var srv http.Server
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("htt2Server handler working: protocal=%v \n", r.Proto)
		if r.Method == "GET" {
			vars := r.URL.Query()
			data := vars.Get("data")
			fmt.Fprint(w, data)
		} else {
			fmt.Fprint(w, "hello h2")
		}
	})
	srv.Handler = mux
	srv.Addr = ":8972"

	//> http2封装并隐藏了http/2的处理逻辑，用户可以不必关心内部的具体实现，像http/1.1一样简单的使用即可
	http2.ConfigureServer(&srv, &http2.Server{})

	if https {
		go func() {
			log.Fatal(srv.ListenAndServeTLS("server.crt", "server.key"))
		}()
	} else {
		go func() {
			log.Fatal(srv.ListenAndServe())
		}()
	}
	select {}

	return nil
}

//> 目前浏览器对http/2都是采用TLS的方式，所以用浏览器访问这个服务的话会退化为http/1.1的协议，
//> 测试的话你可以使用Go实现客户端的h2c访问
func htt2ServerH2C() error {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("htt2ServerH2C handler working: protocal=%v \n", r.Proto)
		if r.Method == "GET" {
			vars := r.URL.Query()
			data := vars.Get("data")
			fmt.Fprint(w, data)
		} else {
			fmt.Fprint(w, "Hello world")
		}
	})
	h2s := &http2.Server{}
	h1s := &http.Server{
		Addr:    ":8972",
		Handler: h2c.NewHandler(handler, h2s),
	}
	log.Fatal(h1s.ListenAndServe())

	return nil
}

func main() {
	var h2type = flag.String("t", "h2c", "h2_nos or h2_s or h2c")
	flag.Parse()

	fmt.Printf("--- h2 type is %v \n", *h2type)
	if *h2type == "h2c" {
		htt2ServerH2C()
	} else if *h2type == "h2_nos" {
		htt2Server(false)
	} else if *h2type == "h2_s" {
		htt2Server(true)
	} else {
		flag.PrintDefaults()
	}
}
