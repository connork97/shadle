"""users table altered

Revision ID: 09fe8fc9931c
Revises: 80f6fef3f8ff
Create Date: 2023-09-01 13:10:50.967615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09fe8fc9931c'
down_revision = '80f6fef3f8ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###