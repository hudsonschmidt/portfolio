"""create experience table

Revision ID: a1b2c3d4e5f6
Revises: 8fe0ff84ee2a
Create Date: 2026-01-31 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = '8fe0ff84ee2a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'experience_data',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('company', sa.Text, nullable=False),
        sa.Column('title', sa.Text, nullable=False),
        sa.Column('date_range', sa.Text, nullable=False),
        sa.Column('description', sa.Text, nullable=False),
        sa.Column('image', sa.Text, nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('experience_data')
