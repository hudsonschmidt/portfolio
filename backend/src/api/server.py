import logging
import time
from fastapi import FastAPI, Request
from src.api import projects, resume
from starlette.middleware.cors import CORSMiddleware
import sqlalchemy
from src import database as db

logger = logging.getLogger(__name__)

description = """
Backend API for www.hudsonschmidt.com
"""
tags_metadata = [
    {"name": "projects", "description": "Keep track of projects."},
    {"name": "resume", "description": "Up to date resume."},
    {"name": "health", "description": "Health check endpoints."},
]

app = FastAPI(
    title="Hudson Schmidt API",
    description=description,
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Hudson Schmidt",
        "email": "hudsonschmidt08@gmail.com",
        "website": "https://www.hudsonschmidt.com",
    },
    openapi_tags=tags_metadata,
)

origins = [
    "http://localhost:4173",
    "https://www.hudsonschmidt.com",
    "https://supabase.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log incoming requests and response times."""
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(
        "%s %s - %d (%.3fs)",
        request.method,
        request.url.path,
        response.status_code,
        duration,
    )
    return response


app.include_router(projects.router)
app.include_router(resume.router)


@app.get("/")
async def root():
    return {"message": "Backend API for www.hudsonschmidt.com"}


@app.get("/health", tags=["health"])
async def health_check():
    """
    Health check endpoint that verifies database connectivity.
    Returns 200 if healthy, 503 if database is unavailable.
    """
    try:
        with db.engine.connect() as connection:
            connection.execute(sqlalchemy.text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error("Health check failed: %s", e)
        return {"status": "unhealthy", "database": "disconnected"}
