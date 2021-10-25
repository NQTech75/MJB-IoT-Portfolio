"""
Project:        mjb-iot-portfolio
File:           sysmon-table.py
Author:         Matt Barton V244576

Description:
re- reads data for screen display

"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from cpu import CPU
from my_db import Base, db_folder, db_filename
_db_filename = db_folder + db_filename


def cpu_load_read():
    engine = create_engine(f'sqlite:///{_db_filename}')
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()

    cpu_records = session.query(CPU).limit(10)

    headers("Date:", 16, "Time:", 16, "CPU Load:", 16, '-', '+', '|')

    for record in cpu_records:
        cpu_time = record.created_at.strftime("%H:%M:%S")
        cpu_date_only = record.created_at.strftime("%d-%m-%Y")

        print(f'| {cpu_date_only:<15}| {cpu_time:<15}| {record.cpu_load: <15.2f}|')


def headers(header_1, head_1_width, header_2, head_2_width, header_3, head_3_width, horizontal, intersection, vertical):

    print(f"{intersection}{horizontal * head_1_width}{intersection}{horizontal * head_2_width}{intersection}"
          f"{horizontal * head_3_width}{intersection}")
    print(f'| {header_1:<{head_1_width-1}s}{vertical} {header_2:<{head_2_width-1}s}'f''
          f'{vertical} {header_3:<{head_3_width-1}s}'f'{vertical}')
    print(f"{intersection}{horizontal * head_1_width}{intersection}{horizontal * head_2_width}{intersection}"
          f"{horizontal * head_3_width}{intersection}")


if __name__ == "__main__":
    cpu_load_read()
