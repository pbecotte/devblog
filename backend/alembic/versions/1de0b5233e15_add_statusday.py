"""add statusDay

Revision ID: 1de0b5233e15
Revises: 38f44d362e21
Create Date: 2017-03-03 03:51:02.198036

"""

# revision identifiers, used by Alembic.
revision = '1de0b5233e15'
down_revision = '38f44d362e21'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'status_day',
        sa.Column('status', sa.Text(), nullable=True),
        sa.Column('date', sa.DateTime(), primary_key=True),
    )


def downgrade():
    op.drop_table('status_day')
