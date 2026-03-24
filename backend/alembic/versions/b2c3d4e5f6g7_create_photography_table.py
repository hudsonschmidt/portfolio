"""create photography table

Revision ID: b2c3d4e5f6g7
Revises: a1b2c3d4e5f6
Create Date: 2026-03-23 20:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b2c3d4e5f6g7'
down_revision: Union[str, None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'photography',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.Text, nullable=False),
        sa.Column('url', sa.Text, nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('photography')
