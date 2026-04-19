from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import traceback
from parser import parse_file
from nlp_pipeline import run_nlp_pipeline

app = FastAPI(title="TextForensics API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
async def get_status():
    return {"status": "ready"}

@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    # Validate file type
    allowed_extensions = ['.pdf', '.docx', '.txt']
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Unsupported file type. Only PDF, DOCX, and TXT are supported.")

    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    try:
        # Parse the file
        text = parse_file(temp_file_path)

        # Run NLP pipeline
        result = run_nlp_pipeline(text)
        result["metadata"]["filename"] = file.filename

        return result

    except Exception as e:
        # Print full traceback for debugging
        print("=" * 60)
        print("FULL TRACEBACK:")
        print("=" * 60)
        traceback.print_exc()
        print("=" * 60)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

    finally:
        # Clean up temp file
        os.unlink(temp_file_path)