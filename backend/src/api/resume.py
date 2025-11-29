from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel, Field, field_validator
from typing import List
from src.api import auth
import sqlalchemy
from src import database as db

router = APIRouter(
    prefix="/resume",
    tags=["resume"],
    dependencies=[Depends(auth.get_api_key)],
)

@router.get("/", tags=["resume"], response_model=str)
def get_resume() -> str:
    """
    Retrieves latest resume.
    """
    with db.engine.begin() as connection:
        result = connection.execute(
            sqlalchemy.text(
                """
                SELECT link
                FROM resume
                ORDER BY id DESC
                LIMIT 1
                """
            )
        ).scalar_one()

    
    return result