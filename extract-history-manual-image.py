"""Extract one embedded historical manual image at its original resolution.

Called by import-history-images.cjs. No redraw, crop, or upscaling.
"""
import sys
from pathlib import Path
from pypdf import PdfReader

pdf, page, image, destination, *options = sys.argv[1:]
source = PdfReader(pdf).pages[int(page) - 1].images[int(image)]
if options and options != ['flip-vertical']:
    raise ValueError('Unknown PDF display transform')
if not source.data.startswith((b"\x89PNG\r\n\x1a\n", b"\xff\xd8")):
    raise ValueError("Expected an embedded PNG or JPEG image")
with Path(destination).open("xb") as output:
    if options:
        from PIL import Image
        source.image.transpose(Image.Transpose.FLIP_TOP_BOTTOM).save(output, format='PNG')
    else:
        output.write(source.data)
