from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.core.files.base import ContentFile

def generate_receipt_pdf(data_context):
    """
    Renders an HTML template into a PDF file in memory.
    """
    template = get_template('donations/receipt_template.html')
    html = template.render(data_context)
    
    result = BytesIO()
    # Create the PDF
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    
    if not pdf.err:
        return result.getvalue()
    return None