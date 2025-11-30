import logging
from fastapi import APIRouter, Depends, HTTPException
from src.api import auth
import sqlalchemy
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

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
    try:
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
    except NoResultFound:
        raise HTTPException(status_code=404, detail="No resume found")
    except SQLAlchemyError as e:
        logger.error("Database error fetching resume: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")