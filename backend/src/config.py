from dotenv import load_dotenv, find_dotenv
import os
from functools import lru_cache

# Load default first
load_dotenv(dotenv_path="default.env", override=False)

# Then override with .env if available
load_dotenv(dotenv_path=find_dotenv(".env"), override=True)


class Settings:
    API_KEY: str | None = os.getenv("API_KEY")
    POSTGRES_URI: str | None = os.getenv("POSTGRES_URI")

    def __init__(self):
        missing = []
        if not self.API_KEY:
            missing.append("API_KEY")
        if not self.POSTGRES_URI:
            missing.append("POSTGRES_URI")
        if missing:
            raise ValueError(
                f"Missing required environment variables: {', '.join(missing)}. "
                f"Please set them in your .env file or environment."
            )


@lru_cache()
def get_settings() -> Settings:
    return Settings()
