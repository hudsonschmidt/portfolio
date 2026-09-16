"""add last_updated to resume

Revision ID: c3d4e5f6a7b8
Revises: b2c3d4e5f6g7
Create Date: 2026-09-16 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c3d4e5f6a7b8'
down_revision: Union[str, None] = 'b2c3d4e5f6g7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # IF NOT EXISTS keeps this a no-op when the column was already added
    # directly to the live database before this migration first runs.
    op.execute(
        "ALTER TABLE resume ADD COLUMN IF NOT EXISTS last_updated TEXT NOT NULL DEFAULT ''"
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("ALTER TABLE resume DROP COLUMN IF EXISTS last_updated")
