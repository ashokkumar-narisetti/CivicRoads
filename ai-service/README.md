# AI Service — Python FastAPI Inference Service (Future Integration)

This directory is reserved for the Python FastAPI microservice that hosts the YOLO-based road defect and pothole detection model.

## Target Architecture

- **Framework:** FastAPI / Uvicorn
- **Model:** Ultralytics YOLO (`best.pt` checkpoint)
- **Role:** Accepts an image URL or image payload, runs object detection, and returns:
  - `defectType` (e.g. `Pothole`, `Cracked Road`)
  - `confidence` (e.g. `0.94`)
  - `severity` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
  - `boundingBoxes` (array of `[x_min, y_min, x_max, y_max]`)

## Expected Endpoint

- **Method:** `POST /predict`
- **Port:** `8000` (Default `http://localhost:8000/predict`)
- **Request Body:**
  ```json
  {
    "imageUrl": "https://res.cloudinary.com/..."
  }
  ```

## Model Checkpoint (`best.pt`) Management
- Do not commit large model weights (>100MB) directly to standard Git commits without Git LFS.
- Save trained weights to `ai-service/weights/best.pt`.
- Run:
  ```bash
  git lfs track "ai-service/weights/*.pt"
  ```
