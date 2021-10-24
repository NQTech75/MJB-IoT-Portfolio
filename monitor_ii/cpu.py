"""
Project:        mjb-iot-portfolio
File:           cpu.py
Author:         Matt Barton V244576

Description:
Creates profile for data to database for CPU

"""
import os
from sqlalchemy import Column, DateTime, Float, func, Integer
from sqlalchemy.ext.declarative import declarative_base

from my_db import Base


class CPU(Base):
    __tablename__ = 'cpu'
    id = Column(Integer, primary_key=True, autoincrement="auto")
    cpu_load = Column(Float)
    created_at = Column(DateTime, server_default=func.now())

    def __init__(self):
        self.cpu_load = -1
