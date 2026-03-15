from sqlalchemy import Column, Integer, String
from database import Base


class HairAnalysis(Base):
    __tablename__ = "hair_analysis"

    id = Column(Integer, primary_key=True, index=True)
    hair_density = Column(Integer)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    password = Column(String(100))