package main

import (
	"crypto/tls"
	"flag"
	"fmt"
	"golang.org/x/net/http2"
	"io/ioutil"
	"log"
	"net"
	"net/http"
)

func h2cClient() {
	client := http.Client{
		// Skip TLS dial
		Transport: &http2.Transport{
			AllowHTTP: true,
			DialTLS: func(network, addr string, cfg *tls.Config) (net.Conn, error) {
				return net.Dial(network, addr)
			},
		},
	}
	resp, err := client.Get("http://localhost:8972?data=helloworld_h2c")
	if err != nil {
		log.Fatal(fmt.Errorf("error making request: %v", err))
	}
	respBody, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("resp.StatusCod=%v, resp.proto=%v, resp.body=%v \n", resp.StatusCode, resp.Proto, string(respBody))
}

func h2sClient() {
	client := http.Client{
		Transport: &http2.Transport{
			AllowHTTP:       true,
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}
	resp, err := client.Get("https://localhost:8972?data=helloworld_h2s")
	if err != nil {
		log.Fatal(fmt.Errorf("error making request: %v", err))
	}
	respBody, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("resp.StatusCod=%v, resp.proto=%v, resp.body=%v \n", resp.StatusCode, resp.Proto, string(respBody))
}

func h1Client(https bool) {
	client := http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}

	url := "http://localhost:8972?data=helloworld_h1_nos"
	if https {
		url = "https://localhost:8972?data=helloworld_h1_s"
	}

	resp, err := client.Get(url)
	if err != nil {
		log.Fatal(fmt.Errorf("error making request: %v", err))
	}
	respBody, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("resp.StatusCod=%v, resp.proto=%v, resp.body=%v \n", resp.StatusCode, resp.Proto, string(respBody))
}

func main() {
	var ctype = flag.String("t", "h2c", "h1 or h2 or h1s or h2s")
	flag.Parse()
	if *ctype == "h1" {
		h1Client(false)
	} else if *ctype == "h2" {
		h2cClient()
	} else if *ctype == "h1s" {
		h1Client(true)
	} else if *ctype == "h2s" {
		h2sClient()
	} else {
		flag.PrintDefaults()
	}
}
