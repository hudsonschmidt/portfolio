import logging
from fastapi import APIRouter, HTTPException
from typing import List
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/resume",
    tags=["resume"],
)

@router.get("/", tags=["resume"], response_model=List[str])
def get_resume() -> List[str]:
    """
    Retrieves resume and cv links, ordered by id ASC.
    First link is the resume, second is the CV.
    """
    try:
        with db.engine.begin() as connection:
            results = connection.execute(
                sqlalchemy.text(
                    """
                    SELECT link
                    FROM resume
                    ORDER BY id ASC
                    """
                )
            ).fetchall()

            links = [row.link for row in results]

        if not links:
            raise HTTPException(status_code=404, detail="No documents found")

        return links
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error("Database error fetching resume: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")