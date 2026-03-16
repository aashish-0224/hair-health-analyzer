from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use SQLite by default for easier deployment.
# If DATABASE_URL is set in the environment (e.g. to a cloud MySQL URL),
# it will override the default.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hair_analyzer.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()