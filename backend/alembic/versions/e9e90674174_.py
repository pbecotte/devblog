"""add image and tagline to entry

Revision ID: e9e90674174
Revises: 3448071662dc
Create Date: 2015-08-16 07:44:49.948537

"""

# revision identifiers, used by Alembic.
revision = 'e9e90674174'
down_revision = '3448071662dc'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('entry', sa.Column('image', sa.String(length=255), nullable=True))
    op.add_column('entry', sa.Column('tagline', sa.String(length=5000), nullable=True))


def downgrade():
    op.drop_column('entry', 'tagline')
    op.drop_column('entry', 'image')
