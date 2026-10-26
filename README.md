# CivicRoads — Road Defect Detection & Reporting System

A production-grade, full-stack monorepo application designed for citizens to report road defects (potholes, cracks) and for municipal officers and administrators to track, verify, and manage their resolution.

The platform integrates with an external AI/ML inference service for automated pothole detection, bounding-box localization, and severity assessment from uploaded road images.

---

## 🏗 Repository Structure

This project is organized as an **npm workspaces** monorepo orchestrated with **Turborepo**:

```
CivicRoads/
├── frontend/               # React 19 + Vite 8 + Tailwind CSS + Recharts
│   ├── src/pages/citizen/  # Public citizen reporting & tracking pages
│   ├── src/pages/officer/  # Municipal officer portal & complaint processing
│   ├── src/pages/admin/    # Super Admin statewide management & analytics
│   └── src/lib/api.ts      # Axios API client wrapper
├── backend/                # Node.js + Express + TypeScript API
│   ├── src/controllers/    # Request handlers & response formatting
│   ├── src/services/       # Business logic (ComplaintService, ML integration)
│   ├── src/middlewares/    # Multer Cloudinary upload, Auth, Error handling
│   └── src/routes/         # /api/citizen, /api/officer, etc.
├── packages/
│   ├── shared/             # Shared Zod schemas, DTOs, and TypeScript contracts
│   └── database/           # Prisma ORM schema, PostgreSQL models, seed script
├── ai-service/             # Python FastAPI YOLO pothole detection service (Future)
│   ├── requirements.txt    # Python dependencies manifest
│   └── README.md           # AI integration & model setup documentation
├── .gitignore              # Monorepo-wide Git exclusion rules
├── .env.example            # Canonical environment variable templates
├── package.json            # Root workspaces definition
└── turbo.json              # Turborepo task pipelines
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v10.0.0 or higher
- **PostgreSQL**: v14 or higher (local instance or cloud database)
- **Cloudinary Account**: Required for image storage (cloud name, API key, API secret)
- **Python**: v3.10+ (optional, only when running the AI inference microservice)

---

### 1. Installation

Clone the repository and install all dependencies from the root directory:

```bash
npm install
```

---

### 2. Environment Configuration

Copy the example environment file to `.env`:

```bash
cp .env.example .env
```

Configure the following variables in `.env` (or in `backend/.env` and `frontend/.env`):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/road_defects?schema=public` |
| `PORT` | Backend Express server port | `3000` |
| `JWT_SECRET` | Secret key for signing Officer/Admin JWTs | `your-super-secret-jwt-key` |
| `ML_SERVICE_URL` | External Python FastAPI microservice URL | `http://localhost:8000/predict` |
| `ENABLE_DEV_MOCK_AI` | Explicitly enable local mock AI inference | `"false"` (or `"true"` for offline testing) |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary cloud identifier | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API access key | `your_api_key` |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret | `your_api_secret` |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:3000/api` |

---

### 3. Database Setup (Prisma & PostgreSQL)

Generate the Prisma Client:
```bash
npm --workspace=@repo/database run generate
```

Synchronize the database schema with your PostgreSQL instance:
```bash
npm --workspace=@repo/database run db:push
```

Seed initial administrative and municipal records:
```bash
npm --workspace=@repo/database run db:seed
```

---

### 4. Running the Development Servers

To run all applications concurrently via Turborepo:
```bash
npm run dev
```

Or run services individually:
- **Frontend only** (Port `5173`):
  ```bash
  npm --workspace=frontend run dev
  ```
- **Backend API only** (Port `3000`):
  ```bash
  npm --workspace=backend run dev
  ```

---

### 5. Running the Python AI Microservice (Future Integration)

The Python FastAPI inference service is documented in `ai-service/`:

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🛠 Quality & Build Commands

- **Build all packages:**
  ```bash
  npm run build
  ```
- **Lint all packages:**
  ```bash
  npm run lint
  ```
- **Format codebase:**
  ```bash
  npm run format
  ```

---

## 🔐 Security & Git Hygiene

- Never commit `.env` files or secret credentials.
- All dependencies (`node_modules/`), build outputs (`dist/`, `build/`), and runtime logs are strictly ignored by `.gitignore`.
- Large model weights (`*.pt`, `*.onnx`) should be managed with Git LFS or external artifact storage.
