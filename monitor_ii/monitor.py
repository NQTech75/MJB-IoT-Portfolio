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
from cpu import CPU
from my_db import Base, db_folder, db_filename

# set db location
_db_filename = db_folder + db_filename


def cpu_load_log():
    """
    Gets the CPU usage using psutil
    adds date and time
    prints to screen every 5 seconds for a total of 12 times
    logs the results to a database file
    """
    engine = create_engine(f'sqlite:///{_db_filename}')
    Base.metadata.create_all(engine)
    my_session = sessionmaker(bind=engine)()
    cpu_record = CPU()
    count = 0
    run = True

    while run:
        cpu_usage = psutil.cpu_percent()
        cpu_date = datetime.now()

        cpu_record.cpu_load = cpu_usage
        cpu_record.created_at = cpu_date
        my_session.add(cpu_record)
        my_session.commit()
        cpu_time = cpu_date.strftime("%H:%M:%S")
        cpu_date_ony = cpu_date.date()
        print(f"Date:{cpu_date_ony} | Time: {cpu_time}| CPU Load: {cpu_usage}% |")
        sleep(5)
        count += 1
        if count < 12:
            run = True
        else:
            run = False


if __name__ == "__main__":
    cpu_load_log()
