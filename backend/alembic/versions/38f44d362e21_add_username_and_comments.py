"""add username and comments

Revision ID: 38f44d362e21
Revises: e9e90674174
Create Date: 2016-08-17 02:01:28.472471

"""

# revision identifiers, used by Alembic.
revision = '38f44d362e21'
down_revision = 'e9e90674174'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('user', sa.Column('alias', sa.String(length=255), nullable=False, unique=True))
    op.add_column('entry', sa.Column('author_id', sa.Integer(), sa.ForeignKey('user.id'), nullable=True))
    op.create_table('comment',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id'), nullable=False),
        sa.Column('post_id', sa.Integer(), sa.ForeignKey('entry.id'), nullable=False),
        sa.Column('text', sa.Text(), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
    )


def downgrade():
    op.drop_column('user', 'alias')
    op.drop_column('entry', 'author_id')
    op.drop_table('comment')
