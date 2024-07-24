#!/bin/bash

CONTAINER_NAME=$(date +'%Y-%m-%d_%H-%M-%S')
docker build . -f ./Dockerfile --tag docker.mox.vc/ollama-json-editor:$CONTAINER_NAME

