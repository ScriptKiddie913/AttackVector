from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database URL - in production, use environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://attackuser:attackpass@localhost:5432/attackvector")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()