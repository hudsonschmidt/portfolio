import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/resume",
    tags=["resume"],
)

class Document(BaseModel):
    link: str
    last_updated: str

@router.get("/", tags=["resume"], response_model=List[Document])
def get_resume() -> List[Document]:
    """
    Retrieves resume and cv documents, ordered by id ASC.
    First entry is the resume, second is the CV.
    """
    try:
        with db.engine.begin() as connection:
            results = connection.execute(
                sqlalchemy.text(
                    """
                    SELECT link, last_updated
                    FROM resume
                    ORDER BY id ASC
                    """
                )
            ).fetchall()

            links = [
                Document(link=row.link, last_updated=row.last_updated)
                for row in results
            ]

        if not links:
            raise HTTPException(status_code=404, detail="No documents found")

        return links
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error("Database error fetching resume: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")