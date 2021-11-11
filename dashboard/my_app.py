"""
Project:        mjb-iot-portfolio
File:           dashboard/my_app.py
Author:         Matt Barton V244576

Description:
Dashboard flask application

"""

from flask import Flask, render_template

my_app = Flask(__name__)


@my_app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':
    my_app.debug = True
    my_app.run()