"""
Project:        mjb-iot-portfolio
File:           my_db.py
Author:         Matt Barton V244576

Description:
Sets location for database file

"""

import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, Float, func, Integer, String
from datetime import datetime

db_folder = "./data/"
db_filename = "monitoring_enviro.db"

if not os.path.isdir(db_folder):
    os.makedirs(db_folder)
    print(f"Created {db_folder} folder")
Base = declarative_base()


class EnvironmentTPH(Base):
    __tablename__ = 'tph_storage'
    id = Column(Integer, primary_key=True, autoincrement="auto")
    device_name = Column(String)
    device_mac = Column(String)
    device_serial = Column(String)
    temperature = Column(Float)
    pressure = Column(Float)
    humidity = Column(Float)
    created_at = Column(DateTime)

    def __init__(self):
        self.device_name = 'UNKNOWN'
        self.device_mac = 'ZZ:ZZ:ZZ:ZZ:ZZ:ZZ'
        self.device_serial = 'UNKNOWN'
        self.temperature = None
        self.pressure = None
        self.humidity = None
        self.created_at = datetime.now()
