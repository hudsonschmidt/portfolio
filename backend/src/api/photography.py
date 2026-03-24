import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/photography",
    tags=["photography"],
)

class Photo(BaseModel):
    id: int
    title: str
    url: str

@router.get("/", tags=["photography"], response_model=List[Photo])
def get_photos() -> List[Photo]:
    """
    Retrieves all photos.
    """
    try:
        with db.engine.begin() as connection:
            results = connection.execute(
                sqlalchemy.text(
                    """
                    SELECT *
                    FROM photography
                    ORDER BY id DESC
                    """
                )
            ).fetchall()

            photos = []
            for row in results:
                photo = Photo(
                    id=row.id,
                    title=row.title,
                    url=row.url,
                )
                photos.append(photo)

        return photos
    except SQLAlchemyError as e:
        logger.error("Database error fetching photos: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")
