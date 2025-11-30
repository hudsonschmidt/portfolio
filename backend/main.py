import os
import uvicorn
from src.config import get_settings

if __name__ == "__main__":
    # Validate settings at startup - fail fast if config is missing
    get_settings()

    port = int(os.getenv("PORT", 3000))
    reload = os.getenv("RELOAD", "true").lower() == "true"

    config = uvicorn.Config(
        "src.api.server:app", port=port, log_level="info", reload=reload, env_file=".env"
    )
    server = uvicorn.Server(config)
    server.run()
