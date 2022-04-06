---
title: 实践：DIND
date: 2021-01-13
description: "实践：DIND"
categories: 
  - foo
keywords: 
  - dind
  - jenkins
permalink:
---

# 实践：DIND

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


## Appendix: 相关文件
> app.js
```
// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to "0.0.0.0"
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
```

> build.sh
```
#!/bin/bash

if [ -z "${1}" ]; then
version="latest"
else
version="${1}"
fi

cd nodejs_app
docker build -t localhost:5000/containersol/nodejs_app:${version} .
cd ..
```

> push.sh
```
#!/bin/bash

if [ -z "${1}" ]; then
version="latest"
else
version="${1}"
fi

docker push localhost:5000/containersol/nodejs_app:"${version}"
```

> start.sh
```
#!/bin/bash

# http://127.0.0.1:8000/

docker build -t my_nodejs_image .
docker run -p 8000:8000 my_nodejs_image
```

> dockerfile_jenkins
```
FROM jenkins

MAINTAINER ContainerSolutions

USER root
#TODO the group ID for docker group on my Ubuntu is 125, therefore I can only run docker commands if I have same group id inside. 
# Otherwise the socket file is not accessible.
RUN groupadd -g 980 docker && usermod -a -G docker jenkins 
USER jenkins
```

> dockerfile_nodejs
```
FROM google/nodejs

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

EXPOSE 8000
CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]
```

> package.json
```
{
    "name": "hello-world",
    "description": "hello world",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "3.x"
    },
    "scripts": {"start": "node app.js"}
}
```
