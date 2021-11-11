"""
Project:        mjb-iot-portfolio
File:           monitor/my_app.py
Author:         Matt Barton V244576

Description:
Monitor API

"""
import psutil
from flask import Flask, render_template

my_app = Flask(__name__)


@my_app.route('/')
def index():
    return render_template('index.html')


@my_app.route('/api/device-load')
def handle_form():
    cpu_load = psutil.cpu_percent()
    return {'CPU Load': cpu_load}


@my_app.route("/api/environment")
def get_api_environment():
    return {"temperature": None, "pressure": None, "humidity": None}


@my_app.route("/api/temperature")
def get_api_temperature():
    return {"temperature": None}


@my_app.route("/api/pressure")
def get_api_pressure():
    return {"pressure": None}


@my_app.route("/api/humidity")
def get_api_humidity():
    return {"humidity": None}


@my_app.route("/api/does-not-exist")
def get_api_does_not_exist():
    return {"error": "Route not implemented"}


if __name__ == '__main__':
    my_app.debug = True
    my_app.run()
