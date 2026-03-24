import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/experience",
    tags=["experience"],
)

class Experience(BaseModel):
    id: int
    company: str
    title: str
    date_range: str
    description: str
    image: str

@router.get("/", tags=["experience"], response_model=List[Experience])
def get_experience() -> List[Experience]:
    """
    Retrieves all experience entries and respective details.
    """
    try:
        with db.engine.begin() as connection:
            results = connection.execute(
                sqlalchemy.text(
                    """
                    SELECT *
                    FROM experience_data
                    ORDER BY id
                    """
                )
            ).fetchall()

            experiences = []
            for row in results:
                experience = Experience(
                    id=row.id,
                    company=row.company,
                    title=row.title,
                    date_range=row.date_range,
                    description=row.description,
                    image=row.image
                )
                experiences.append(experience)

        return experiences
    except SQLAlchemyError as e:
        logger.error("Database error fetching experience: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")
