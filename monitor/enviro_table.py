"""
Project:        mjb-iot-portfolio
File:           enviro_table.py
Author:         Matt Barton V244576

Description:
Checks Environmental table

"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from my_db import Base, db_folder, db_filename, EnvironmentTPH

_db_filename = db_folder + db_filename


def cpu_load_read():
    engine = create_engine(f'sqlite:///{_db_filename}')
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()

    enviro_records = session.query(EnvironmentTPH).limit(10)

    for record in enviro_records:
        print(f"Name:{record.device_name} | Mac: {record.device_mac} | Created: {record.created_at}")


if __name__ == "__main__":
    cpu_load_read()