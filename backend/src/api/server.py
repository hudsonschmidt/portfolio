from fastapi import FastAPI
from src.api import projects, resume
from starlette.middleware.cors import CORSMiddleware

description = """
Backend API for www.hudsonschmidt.com
"""
tags_metadata = [
    {"name": "projects", "description": "Keep track of projects."},
    {"name": "resume", "description": "Up to date resume."},
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

origins = ["http://localhost:4173", "https://www.hudsonschmidt.com", "https://supabase.com/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(resume.router)


@app.get("/")
async def root():
    return {"message": "Backend API for www.hudsonschmidt.com"}
