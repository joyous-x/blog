## operation 
- 测试状态：未完成：grafana 对接 influxdb 失败
    + mkdir -p /data/influxdb
    + influx
        - docker run -d -p 8083:8083 -p 8086:8086 --volume=/data/influxdb:/var/lib/influxdb --name=influxsrv --hostname=influxsrv tutum/influxdb
            + http://192.168.220.130:8083/ ::: 使用username为root，password为root登陆influxdb, 创建database：cadvisor 
                - CREATE DATABASE "cadvisor" ,,, SHOW DATABASES
            + http://192.168.220.130:8086/ ::: influxdb 的 http api 接口

    + cadvisor
        - docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --detach=true --name=cadvisor --hostname=cadvisor google/cadvisor -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=192.168.220.130:8086  
            - 可以通过参数指定用户名密码 ::: -storage_driver_user=root -storage_driver_password=xxx,,,默认root:root
            - 确认数据导入influx ::: 在InfluxDB管理界面，切换Database到cadvisor，输入SHOW MEASUREMENTS可以看到已创建很多表
            - http://192.168.220.130:8080 ::: https://github.com/kubernetes/kubernetes/issues/32728#issuecomment-252469277
            - http://192.168.220.130:8080/metrics ::: 对接 prometheus 的方式和 influx 不一样

    + grafana
        - docker create -p 3000:3000 --hostname grafana --name grafana grafana/grafana
            + http://192.168.220.130:3000  ::: username为admin，password为admin

    + prometheus
        - docker run -d -p 9090:9090 --name=prometheus --user 0 -v /data/prometheus:/data prom/prometheus --config.file=/data/prometheus.yml --storage.tsdb.path=/data/tsdb --storage.tsdb.retention=6h
            + http://192.168.220.130:9090 ::: Status -> Targets
            + 注意：
                - 可以结合使用 Node Exporter 和 cAdvisor：
                    + Node Exporter负责收集 host 硬件和操作系统数据。端口：9100
                    + cAdvisor负责收集容器数据。端口：8080
                - 不指定 --user 0 时，会遇到: "opening storage failed: lock DB directory: open /data/tsdb/lock: permission denied"
                    + 可以试试：--privileged = true
        - 以下为 prometheus.yml 内容:
            ```
            global:
              scrape_interval: 15s
              external_labels:
                monitor: 'codelab-monitor'
            scrape_configs:
              - job_name: 'prometheus'
                scrape_interval: 5s
                static_configs:
                - targets: ['localhost:9090','localhost:8080','localhost:9100','192.168.220.130:8080','192.168.220.130:9100']
            ```
        - docs:
            + [https://www.ctolib.com/docs/sfile/prometheus-book/ha/prometheus-local-storage.html]

```
cadvisor:
    - 使用 link
        - docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --detach=true --name=cadvisor --link influxsrv:influxsrv google/cadvisor:latest -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=influxsrv:8086
    - 使用 link 时, storage_driver_host 可以通过 link 指定的别名来访问
```

- 参考: 
    + url: [https://blog.csdn.net/liyingke112/article/details/74923178]

- 辅助
    + cadvisor ::: 在 k8s 上可以以 DaemonSet 资源类型 部署，保证每个节点一个实例
    + docker run 参数：--restart=always
    + curl -G "http://localhost:8086/db/cadvisor/series?u=root&p=root" --data-urlencode "q=SELECT * FROM for_test"  -iv