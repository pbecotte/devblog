"""initial migration

Revision ID: 3448071662dc
Revises: 
Create Date: 2015-05-28 20:49:57.657797

"""

# revision identifiers, used by Alembic.
revision = '3448071662dc'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('entry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.Column('slug', sa.String(length=255), nullable=True),
    sa.Column('content', sa.String(length=50000), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id', name='entry_primary_key'),
    sa.UniqueConstraint('slug', name='slug_unique_constraint'),
    sa.UniqueConstraint('title', name='title_unique_constraint')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id', name='role_primary_key'),
    sa.UniqueConstraint('name', name='name_unique_constraint')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('confirmed_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id', name='user_primary_key'),
    sa.UniqueConstraint('email', name='email_unique_constraint')
    )
    op.create_table('roles_users',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], name='role_constraint'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='user_constraint')
    )
    ### end Alembic commands ###


def downgrade():
    op.drop_table('roles_users')
    op.drop_table('user')
    op.drop_table('role')
    op.drop_table('entry')
    ### end Alembic commands ###
