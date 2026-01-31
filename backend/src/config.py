from dotenv import load_dotenv, find_dotenv
import os
from functools import lru_cache

# Load default first
load_dotenv(dotenv_path="default.env", override=False)

# Then override with .env if available
load_dotenv(dotenv_path=find_dotenv(".env"), override=True)


class Settings:
    API_KEY: str | None = os.getenv("API_KEY")  # Optional, for future admin endpoints
    POSTGRES_URI: str | None = os.getenv("POSTGRES_URI")

    def __init__(self):
        if not self.POSTGRES_URI:
            raise ValueError(
                "Missing required environment variable: POSTGRES_URI. "
                "Please set it in your .env file or environment."
            )


@lru_cache()
def get_settings() -> Settings:
    return Settings()
