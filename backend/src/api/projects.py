import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import sqlalchemy
from sqlalchemy.exc import SQLAlchemyError
from src import database as db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
)

class Project(BaseModel):
    id: int
    name: str
    date: str
    desc: str
    img: str

@router.get("/", tags=["projects"], response_model=List[Project])
def get_projects() -> List[Project]:
    """
    Retrieves all projects and respective details.
    """
    try:
        with db.engine.begin() as connection:
            results = connection.execute(
                sqlalchemy.text(
                    """
                    SELECT *
                    FROM project_data
                    """
                )
            ).fetchall()

            projects = []
            for row in results:
                project = Project(
                    id=row.id,
                    name=row.name,
                    date=row.date,
                    desc=row.desc,
                    img=row.img
                )
                projects.append(project)

        return projects
    except SQLAlchemyError as e:
        logger.error("Database error fetching projects: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")