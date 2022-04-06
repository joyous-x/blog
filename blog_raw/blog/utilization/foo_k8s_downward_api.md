---
title: 实践：k8s 之 downward api
date: 2020-04-13
description: "k8s 之 downward api"
categories: 
  - foo
permalink:
---

#

- expose Pod and Container fields to a running Container
  + docs: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/#the-downward-api
  + example:
  ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: test-host-ip
    spec:
      containers:
        - name: test-host-ip
          image: k8s.gcr.io/busybox
          command: [ "sh", "-c"]
          args:
          - while true; do
              echo -en '\n';
              printenv MY_NODE_NAME MY_POD_NAME MY_POD_NAMESPACE;
              printenv MY_POD_IP MY_POD_SERVICE_ACCOUNT;
              sleep 10;
            done;
          env:
            - name: MY_NODE_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.hostIP
            - name: MY_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: MY_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: MY_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
      restartPolicy: Never
    ```