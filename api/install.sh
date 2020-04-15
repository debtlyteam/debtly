#!/bin/sh
# create virtual environment requires python3-venv
python3 -m venv venv
# source virtual environment
. venv/bin/activate
# install required python libraries to environment
pip install -r requirements.txt
