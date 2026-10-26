# Road Defect Detection & Reporting System

A production-grade, full-stack monorepo application designed for citizens to report road defects (potholes, cracks) and for municipal officers to track and manage their resolution.

This system leverages an external AI/ML service for automated defect detection, severity assessment, and cost estimation based on uploaded images.

---

## 🏗 Architecture

This project is structured as a **Monorepo** using npm workspaces and Turborepo for fast, cached builds.

### Project Structure
- `apps/web`: The React 18 frontend (Vite, React Router, Tailwind CSS). Contains the Citizen, Officer, and Admin portals.
- `apps/api`: The Node.js / Express backend API using a layered architecture (Routes -> Controllers -> Services).
- `packages/database`: The Prisma schema, migrations, and generated client for PostgreSQL.
- `packages/shared`: Shared TypeScript types and Zod validation schemas used across both the frontend and backend to guarantee strict type safety.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher) running locally or remotely
- **Cloudinary** account (for image uploads)

### 1. Installation

Clone the repository and install all dependencies from the root directory:

```bash
npm install
```

### 2. Environment Variables

You need to configure your environment variables. In the root directory (or in `apps/api`), ensure you have a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/road_defects?schema=public"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# ML Microservice URL (FastAPI)
ML_SERVICE_URL="http://localhost:8000/predict"

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Frontend Configuration (Optional if running apps/web separately)
VITE_API_URL="http://localhost:3000/api"
```

### 3. Database Setup

Before starting the application, you must apply the database schema and optionally seed it with initial data (like an Admin user and a test Municipality).

```bash
# Navigate to the database package
cd packages/database

# Push the schema to your PostgreSQL database
npm run db:push

# Seed the database
npm run db:seed
```

### 4. Running the Application

To run the entire stack (Frontend and Backend concurrently), go back to the root directory and use Turborepo:

```bash
npm run dev
```

- **Frontend (Web App)** will be available at: `http://localhost:5173`
- **Backend (API)** will be available at: `http://localhost:3000`

---

## 🧠 Integrating the ML Model (FastAPI)

This system is designed to integrate with an external Python FastAPI microservice that handles the heavy lifting of running computer vision models (e.g., YOLOv8) on the uploaded images.

### How it Works
When a citizen reports a defect, the Node.js API:
1. Uploads the image to Cloudinary.
2. Makes a REST POST request to the `ML_SERVICE_URL`.
3. Attaches the ML insights to the newly created database record.

### Expected ML Service Contract

Your FastAPI service must expose an endpoint (e.g., `POST /predict`) that accepts a JSON payload and returns specific data points.

**Request Payload to ML Service:**
```json
{
  "imageUrl": "https://res.cloudinary.com/..."
}
```

**Expected Response from ML Service:**
```json
{
  "defectType": "Pothole",
  "severity": "HIGH",
  "estimatedAreaSqM": 2.5,
  "estimatedCost": 450.00
}
```
*(Note: Ensure the `severity` matches the Prisma Enum: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`)*

---

## 🛡️ Best Practices & Guidelines

- **Service Layer**: Keep business logic out of Express route handlers. Always put logic inside `apps/api/src/services/`.
- **Validation**: Never trust client data. All incoming requests to the API are validated using Zod schemas defined in `packages/shared/src/schemas`.
- **Styling**: The frontend utilizes Tailwind CSS. Try to stick to utility classes. If you need complex UI components, use the pre-configured `shadcn/ui` components inside `apps/web/src/components/ui`.
- **Commits**: Ensure your code passes linting before committing. You can run `npm run lint` at the root to check all packages simultaneously.
