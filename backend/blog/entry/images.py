from uuid import uuid4
import boto
from flask import current_app as app
import os
from tempfile import TemporaryFile
from werkzeug import secure_filename


def handle_image(image, acl='public-read'):
    filename = secure_filename(image.data.filename)
    source_extension = os.path.splitext(filename)[1]
    destination_filename = uuid4().hex + source_extension

    # Connect to S3
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])

    # Upload the File
    sml = b.new_key("/".join([app.config["S3_UPLOAD_DIRECTORY"], destination_filename]))
    with TemporaryFile() as t:
        image.data.save(t)
        t.seek(0)
        sml.set_contents_from_file(t)

    # Set the file's permissions.
    sml.set_acl(acl)

    return destination_filename
