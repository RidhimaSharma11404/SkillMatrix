# ⚡ SkillMatrix — Enterprise Developer Talent & Bench Allocation Hub

A full-stack enterprise web application built with **Spring Boot 3 (Java 17+)** and **React (Vite)**, specifically crafted for **Cognizant Full-Stack Java Developer technical interviews**.

---

## 🎯 Project Overview
In global IT consultancies like Cognizant, project managers and delivery leads need to quickly identify engineers on the bench with specific tech stacks (e.g. Java, Spring Boot, React, AWS, Docker) to allocate them to new client engagements.

**SkillMatrix** provides:
* **Real-time Bench & Talent Analytics** (Total headcount, bench rate %, active client allocations).
* **Smart Skill & Keyword Search** (Instant filtering by skills, roles, and status).
* **1-Click Project Allocation Workflow** (Assign developer to client project or release back to bench).
* **Full CRUD Management** (Add, Edit, View, and Delete engineer profiles with validation).

---

## 🏗️ Architecture & Tech Stack

```
skillmatrix/
├── backend/                  # Spring Boot 3.x REST API
│   ├── src/main/java/com/cognizant/skillmatrix/
│   │   ├── config/           # CORS, Swagger/OpenAPI, DataInitializer (seeds 7 realistic dev profiles)
│   │   ├── controller/       # DeveloperController (@RestController, @RequestMapping)
│   │   ├── dto/              # Request & Response DTOs, ErrorResponse, StatsDTO
│   │   ├── entity/           # Developer JPA Entity, Enums (Status, Level)
│   │   ├── exception/        # GlobalExceptionHandler (@RestControllerAdvice), Custom Exceptions
│   │   ├── repository/       # DeveloperRepository (Spring Data JPA + JPQL Queries)
│   │   └── service/          # DeveloperService interface & DeveloperServiceImpl (@Transactional)
│   └── src/main/resources/
│       └── application.yml   # H2 DB config, Swagger UI endpoints
│
└── frontend/                 # React 18 + Vite
    └── src/
        ├── api/              # developerService.js (REST API client)
        ├── components/       # Navbar, StatsCards, FilterBar, DeveloperCard, DeveloperModal, AllocateModal, Toast
        ├── App.jsx           # State orchestration & filters
        └── index.css         # Modern glassmorphism & responsive layout
```

---

## 🚀 How to Run Locally

### 1. Run the Spring Boot Backend
Open a terminal in the `backend` folder:
```bash
cd backend
mvn spring-boot:run
```
*(If you don't have Maven installed, you can also open the `backend` folder in IntelliJ IDEA, Eclipse, or VS Code and run `SkillMatrixApplication.java` directly).*

* **Backend URL**: `http://localhost:8080`
* **Interactive Swagger UI**: `http://localhost:8080/swagger-ui.html`
* **H2 Database Console**: `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:skillmatrixdb`, User: `sa`, Password: leave blank)*

---

### 2. Run the React Frontend
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

* **Frontend URL**: `http://localhost:5173`

---

## 📋 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/developers` | List all developers (supports `?search=`, `?status=`, `?skill=`) |
| `GET` | `/api/v1/developers/{id}` | Get developer by ID |
| `POST` | `/api/v1/developers` | Create a new developer profile |
| `PUT` | `/api/v1/developers/{id}` | Update existing developer profile |
| `PATCH` | `/api/v1/developers/{id}/allocate` | Allocate developer to a client project |
| `PATCH` | `/api/v1/developers/{id}/release` | Release developer back to bench (AVAILABLE) |
| `DELETE` | `/api/v1/developers/{id}` | Delete developer profile |
| `GET` | `/api/v1/developers/stats` | Get KPI metrics and top skills count |

---

## 🎓 Interview Cheat Sheet
Check out [`INTERVIEW_CHEAT_SHEET.md`](./INTERVIEW_CHEAT_SHEET.md) in this directory for the exact 30-second introduction pitch and answers to top Cognizant interview questions!
