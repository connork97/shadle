"""recreating deleted revision

Revision ID: fdc1cbf4bbde
Revises: 0b86175e066f
Create Date: 2023-09-06 12:51:46.232440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fdc1cbf4bbde'
down_revision = '0b86175e066f'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('users', 'site_visits')
    op.add_column('users', sa.Column('ip', sa.String(), nullable=True))
    op.add_column('games', sa.Column('ip', sa.String(), nullable=True))

def downgrade():
    op.add_column('users', sa.Column('site_visits', sa.Integer(), nullable=True))
    op.drop_column('users', 'ip')
    op.drop_column('games', 'ip')
