from src import config
from sqlalchemy import create_engine

connection_url = config.get_settings().POSTGRES_URI
engine = create_engine(
    connection_url,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    pool_recycle=3600,  # Recycle connections after 1 hour
)
