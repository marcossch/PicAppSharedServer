#!/bin/bash
NODE_ENV=development
echo "BUILDING DOCKER IMAGE"
sudo docker build -t picapp/postman .
echo "LAUNCHING DOCKER CONTAINER"
sudo docker-compose up