# DIND

## registry
- run
    + docker run -d -p 5000:5000 -v /tmp/registry:/registry --name registry registry
- watch
    + http://127.0.0.1:5000/v2/_catalog
- test
    + docker build -t localhost:5000/containersol/nodejs_app
    + docker push localhost:5000/containersol/nodejs_app

## jenkins
- build
    + docker build -t containersol/jenkins_with_docker -f dockerfile_jenkins .
- run 
    + docker run -d -p 8081:8080 -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker  -v $(pwd):/var/jenkins_data -v jenkins-stuff:/var/jenkins_home --name jenkins containersol/jenkins_with_docker
    ```
        -v /usr/lib64/libltdl.so.7:/usr/lib/x86_64-linux-gnu/libltdl.so.7
        --user jenkins
    ```
- test
    + docker exec -it --user jenkins [container_id] /bin/bash
    + docker build -t localhost:5000/containersol/nodejs_app:v2 -f /var/jenkins_data/dockerfile_nodejs /var/jenkins_data
- note
    + 一定要保证：在 dockerfile_jenkins 中, RUN groupadd -g 980 docker, 时的 gid(980) 和 宿主机的docker组gid一致
- watch
    + http://127.0.0.1:8081