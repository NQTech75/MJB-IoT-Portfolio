"""
Project:        mjb-iot-portfolio
File:           monitor.py
Author:         Matt Barton V244576

Description:
This file is to monitor the CPU load

"""

import psutil
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from time import sleep


def cpu_load():
    """
    Gets the CPU usage using psutil
    adds date and time
    prints to screen every 5 seconds for a total of 12 times
    """
    count = 0
    run = True

    while run:
        cpu_usage = psutil.cpu_percent()
        cpu_date = datetime.now().date()
        cpu_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"Date:{cpu_date} | Time: {cpu_time}| CPU Load: {cpu_usage}% |")
        sleep(5)
        count += 1
        if count < 12:
            run = True
        else:
            run = False


if __name__ == "__main__":
    cpu_load()
