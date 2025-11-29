from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel, Field, field_validator
from typing import List
from src.api import auth
import sqlalchemy
from src import database as db

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
    dependencies=[Depends(auth.get_api_key)],
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