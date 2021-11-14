"""
Project:        mjb-iot-portfolio
File:           monitor_enviro.py
Author:         Matt Barton V244576

Description:
Handles environmental monitoring and data to the dashboard

"""
import psutil
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from time import sleep
from cpu import CPU
from my_db import Base, EnvironmentTPH, db_folder, db_filename
from mypi import get_host_name, get_mac, get_serial
from sense_hat import SenseHat

# set db location
_db_filename = db_folder + db_filename


def environment_log():
    """
    Gets Data
    logs the results to a database file
    """

    count = 0
    run = True

    while run:
        engine = create_engine(f'sqlite:///{_db_filename}')
        Base.metadata.create_all(engine)
        my_session = sessionmaker(bind=engine)()
        environment_record = EnvironmentTPH()
        # create db instance
        cpu_usage = psutil.cpu_percent()
        # load data to table
        environment_record.device_name = get_host_name()
        environment_record.device_mac = get_mac()
        environment_record.device_serial = get_serial()
        environment_record.temperature = 32.1
        environment_record.pressure = 1018.9
        environment_record.humidity = 76.5
        environment_record.created_at = datetime.now()
        my_session.add(environment_record)
        my_session.commit()

        print(f" {environment_record.device_name}| {environment_record.created_at} ")
        sleep(5)
        count += 1
        if count < 12:
            run = True
        else:
            run = False


if __name__ == "__main__":
    environment_log()
