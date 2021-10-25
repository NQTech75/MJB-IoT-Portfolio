"""
Project:        mjb-iot-portfolio
File:           my_db.py
Author:         Matt Barton V244576

Description:
Sets location for database file

"""

import os
from sqlalchemy.ext.declarative import declarative_base

db_folder = "./data/"
db_filename = "monitoring_cpu.db"

if not os.path.isdir(db_folder):
    os.makedirs(db_folder)
    print(f"Created {db_folder} folder")
Base = declarative_base()
