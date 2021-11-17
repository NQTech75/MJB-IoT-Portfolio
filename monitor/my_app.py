"""
Project:        mjb-iot-portfolio
File:           monitor/my_app.py
Author:         Matt Barton V244576

Description:
Monitor API

"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import psutil
from flask import Flask, render_template
from my_db import Base, db_folder, db_filename, EnvironmentTPH
import json

_db_filename = db_folder + db_filename
my_app = Flask(__name__)


@my_app.route('/')
def index():
    return render_template('index.html')


@my_app.route('/api/device-load')
def handle_form():
    cpu_load = psutil.cpu_percent()
    return {'CPULoad': cpu_load}


@my_app.route("/api/environment/<quantity>")
def get_api_environment(quantity):
    engine = create_engine(f'sqlite:///{_db_filename}', connect_args={'check_same_thread': False})
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    enviro_record = session.query(EnvironmentTPH).limit(quantity)
    result = []
    for record in enviro_record:
        temperature = record.temperature
        pressure = record.pressure
        humidity = record.humidity
        created = record.created_at
        environment = {"temperature": temperature, "pressure": pressure, "humidity": humidity, "created_at": created}
        result.append(environment)

    json_result = json.dumps({"environment": result}, default=str)
    return json_result


@my_app.route("/api/temperature")
def get_api_temperature():
    engine = create_engine(f'sqlite:///{_db_filename}', connect_args={'check_same_thread': False})
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    enviro_record = session.query(EnvironmentTPH).limit(1)
    for record in enviro_record:
        temperature = record.temperature
        return {"temperature": temperature}


@my_app.route("/api/pressure")
def get_api_pressure():
    engine = create_engine(f'sqlite:///{_db_filename}',connect_args={'check_same_thread': False})
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    enviro_record = session.query(EnvironmentTPH).limit(1)
    for record in enviro_record:
        pressure = record.pressure
        return {"pressure": pressure}


@my_app.route("/api/pressure/<quantity>")
def get_api_pressure_qty(quantity):
    engine = create_engine(f'sqlite:///{_db_filename}',connect_args={'check_same_thread': False})
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    enviro_record = session.query(EnvironmentTPH).limit(quantity)
    result = []
    for record in enviro_record:
        pressure = record.pressure
        created = record.created_at
        environment = {"pressure": pressure, "created_at": created}
        result.append(environment)

    json_result = json.dumps({"pressures": result}, default=str)
    return json_result


@my_app.route("/api/humidity")
def get_api_humidity():
    engine = create_engine(f'sqlite:///{_db_filename}',connect_args={'check_same_thread': False})
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    enviro_record = session.query(EnvironmentTPH).limit(1)
    for record in enviro_record:
        humidity = record.humidity
        return {"humidity": humidity}


@my_app.route("/api/does-not-exist")
def get_api_does_not_exist():
    return {"error": "Route not implemented"}


if __name__ == '__main__':
    my_app.debug = True
    my_app.run()
