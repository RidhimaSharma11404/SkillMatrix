# 🚀 Deployment Guide for SkillMatrix (Free Cloud & Docker)

You have 3 ways to deploy and showcase this project:

---

## ⚡ Option 1: Instant 1-Click Local Demo (Zero Setup)
Simply double-click:
📂 `C:\Users\Lenovo\.gemini\antigravity\scratch\skillmatrix\launch_demo.bat`
*(Or open [`standalone_app.html`](file:///C:/Users/Lenovo/.gemini/antigravity/scratch/skillmatrix/standalone_app.html) directly in Chrome/Edge).*

This runs the full React application in your browser instantly without needing any command-line tools.

---

## 🐳 Option 2: 1-Click Docker Deployment
If you have Docker Desktop installed:
```bash
cd C:\Users\Lenovo\.gemini\antigravity\scratch\skillmatrix
docker-compose up --build
```
* **Frontend**: `http://localhost:5173`
* **Backend**: `http://localhost:8080`
* **Swagger Docs**: `http://localhost:8080/swagger-ui.html`

---

## ☁️ Option 3: Free Cloud Deployment (Live Link for Resume)

### A. Deploy Backend to **Render.com** (Free)
1. Push your `backend` folder to a GitHub repository.
2. Go to [Render.com](https://render.com) and click **New + Web Service**.
3. Select **Docker** or **Java Maven**:
   * Build Command: `mvn clean package -DskipTests`
   * Start Command: `java -jar target/skillmatrix-backend-1.0.0.jar`
4. Copy your live backend URL (e.g., `https://skillmatrix-api.onrender.com`).

### B. Deploy Frontend to **Vercel / Netlify** (Free)
1. In `frontend/src/api/developerService.js`, update `BASE_URL` with your Render URL.
2. Push your `frontend` folder to GitHub.
3. Import the repository into [Vercel.com](https://vercel.com).
4. Framework preset: **Vite** $\rightarrow$ Click **Deploy**.
5. You now have a live public link to put on your Resume!
