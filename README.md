
# TextForensics - NLP Document Analysis Dashboard

A comprehensive NLP-powered document analysis tool that extracts insights from PDF, DOCX, and TXT files.

## Features

- **Emotion Analysis**: Detects joy, sadness, anger, fear, surprise, and disgust across the document
- **Sentiment Timeline**: Tracks positive/negative sentiment progression
- **Named Entity Recognition**: Identifies people, organizations, places, and dates
- **Part-of-Speech Tagging**: Analyzes grammatical structure
- **TF-IDF Keywords**: Extracts important terms
- **Readability Metrics**: Flesch Reading Ease, Gunning Fog, etc.
- **Lexical Diversity**: Type-Token Ratio and vocabulary richness

## Setup Instructions

### Backend Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Download spaCy model**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

3. **Run the backend**:
   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Run the frontend**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Usage

1. Open the application in your browser
2. Upload a PDF, DOCX, or TXT file
3. Wait for the analysis to complete (may take 30-60 seconds for large documents)
4. Explore the interactive dashboard with various charts and metrics

## API Endpoints

- `GET /status` - Check if the service is ready
- `POST /analyze` - Analyze a document (multipart file upload)

## Notes

- The emotion classification model (~500MB) will download automatically on first use
- Documents longer than 500 sentences are truncated to keep response times reasonable
- All processing happens locally - no data is sent to external servers
  