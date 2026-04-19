import fitz  # PyMuPDF
from docx import Document
import os

def parse_file(file_path: str) -> str:
    """
    Parse a file (PDF, DOCX, or TXT) and return plain text.
    """
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.pdf':
        return parse_pdf(file_path)
    elif ext == '.docx':
        return parse_docx(file_path)
    elif ext == '.txt':
        return parse_txt(file_path)
    else:
        raise ValueError("Unsupported file type. Only PDF, DOCX, and TXT are supported.")

def parse_pdf(file_path: str) -> str:
    """
    Extract text from PDF using PyMuPDF.
    """
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text

def parse_docx(file_path: str) -> str:
    """
    Extract text from DOCX using python-docx.
    """
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def parse_txt(file_path: str) -> str:
    """
    Read text from TXT file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()