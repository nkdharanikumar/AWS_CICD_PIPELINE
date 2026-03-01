#!/bin/bash
set -e

sudo docker pull dklokiuk/simple-python-flask-app

sudo docker run -d \
  --name simple-python-flask-app \
  -p 5000:5000 \
  dklokiuk/simple-python-flask-app