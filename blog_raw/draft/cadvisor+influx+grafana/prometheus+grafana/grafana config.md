## 
- {state="running", container_label_qcloud_app="minigame-login"}
- {container_label_io_kubernetes_pod_namespace="default"}

container_cpu_usage_seconds_total{ container_label_qcloud_app="minigamefarm", container_label_io_kubernetes_pod_namespace="miniprogram"}

- name: http_requests_total
    + prometheus: 
        - http_requests_total

## SYS
- name: container_start_time
    + prometheus:
        - query:
            + container_start_time_seconds{container_label_io_kubernetes_pod_namespace="default",container_label_io_kubernetes_container_name="POD",container_label_qcloud_app!=""}
        - Legend format:
            + {{container_label_io_kubernetes_pod_name}} = {{instance}}

## CPU
- name: cpu_usage_by_container
    + prometheus:
        - query:
            + rate(container_cpu_system_seconds_total{container_label_qcloud_app="minigamebox"}[1m])
        - Legend format:
            + 

## MEMORY
- name: memory_usage
    + prometheus:
        - container_memory_usage_bytes{container_label_io_kubernetes_container_name="minigame-login", container_label_io_kubernetes_pod_namespace="default"}
        - {{container_label_io_kubernetes_pod_namespace}}={{container_label_io_kubernetes_pod_name}}={{instance}}

## NET
- name: network_receive_rate_by_pod
    + prometheus
        - sum(rate(container_network_receive_bytes_total{container_label_qcloud_app!=""}[1m])) by (container_label_qcloud_app, container_label_io_kubernetes_pod_namespace)
        - 

- name: network_receive_rate_pod_detail
    + prometheus
        - query:
            + rate(container_network_receive_bytes_total{container_label_qcloud_app="minigamebox"}[1m])

## IO
- name: container_fs_io_time_weighted_seconds_total
    + prometheus:
        - query:
            + container_fs_io_time_weighted_seconds_total
        - Legend format:
            + {{instance}}={{device}}

## reference
- [https://prometheus.io/docs/prometheus/latest/querying/basics/]