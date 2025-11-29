"""create tables

Revision ID: 8fe0ff84ee2a
Revises: e91d0c24f7d0
Create Date: 2025-06-17 17:12:01.770056

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8fe0ff84ee2a'
down_revision: Union[str, None] = 'e91d0c24f7d0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_table('global_inventory')
    op.create_table(
        'project_data',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.Text, nullable=False),
        sa.Column('date', sa.Text, nullable=False),
        sa.Column('desc', sa.Text, nullable=False),
        sa.Column('img', sa.Text, nullable=False),
    )
    op.create_table(
        'resume',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('link', sa.Text, nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
