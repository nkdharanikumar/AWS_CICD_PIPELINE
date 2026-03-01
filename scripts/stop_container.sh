#!/bin/bash
set -e

docker stop simple-python-flask-app || true
docker rm simple-python-flask-app || true