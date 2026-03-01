#!/bin/bash
set -e

sudo docker stop simple-python-flask-app || true
sudo docker rm simple-python-flask-app || true