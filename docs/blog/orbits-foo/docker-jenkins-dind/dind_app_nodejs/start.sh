#!/bin/bash

# http://127.0.0.1:8000/

docker build -t my_nodejs_image .
docker run -p 8000:8000 my_nodejs_image