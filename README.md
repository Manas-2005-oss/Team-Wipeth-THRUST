# THRUST – AI Driven Economic Policy Simulator

## Overview
THRUST is an AI-powered macroeconomic policy simulator that allows users to test economic policies and analyze their impact on key indicators such as GDP, unemployment, inflation, trade balance, and sector output.

The system enables policymakers, economists, and researchers to experiment with fiscal and trade policy scenarios using an interactive dashboard powered by an economic simulation engine.

---

# System Architecture

The system is divided into two main components:

### Frontend
React-based dashboard built using modern UI components.

Features:
- This model contains dual interface one General User Interface another one is Economist Interface
- Policy input interface
- Economic indicators dashboard
- Interactive data visualizations
- Sector distribution analysis
- Trade and fiscal analysis charts
- AI Policy Assistant (User Mode)

### Backend
FastAPI-based economic simulation engine.

Modules include:

- Production Model
- Fiscal Policy Module
- Labor Market Model
- Trade Model
- GDP Forecasting Engine
- Policy Interpretation Engine

---

# AI Policy Assistant

The system includes an AI-powered policy assistant that helps interpret natural language policy instructions entered by users.


The assistant converts the natural language instruction into structured policy parameters used by the economic simulation engine.

---

# External APIs Used

The project uses the **Groq API** to power the AI Policy Assistant.

Model used:

**LLaMA-3.1-8B-Instant**

The LLM interprets user policy prompts and extracts policy parameters that are passed to the backend simulation engine.

---

# API Setup

To run the AI Policy Assistant, you must set the Groq API key as an environment variable.

### Linux / Mac

```
export GROQ_API_KEY=your_api_key_here
```

### Windows

```
set GROQ_API_KEY=your_api_key_here
```

The backend reads the API key securely using environment variables.

---

 

# Running the Project

## Backend

Navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the FastAPI server:

```
uvicorn main:app --reload
```

Backend will start at:

```
http://127.0.0.1:8000
```

---

## Frontend

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
pnpm install
```

Run the frontend:

```
pnpm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

# Testing the Simulation

Example policy input:

```
increase manufacturing subsidy by 10%
reduce tax by 3%
increase tariff by 5%
```

The simulator will display:

- GDP impact
- Unemployment change
- Inflation change
- Trade balance
- Sector output distribution
- Economic forecast graphs

---

# Technology Stack

### Frontend
- React
- Tailwind CSS
- Vite
- Chart visualizations

### Backend
- FastAPI
- Python
- Economic simulation engine

### AI
- Groq API
- LLaMA-3.1-8B-Instant

---

# Team

**Team THRUST**

AI Economic Policy Simulator