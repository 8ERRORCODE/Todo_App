# Stage 1: Build React frontend
FROM node:20 as frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


# Stage 2: Backend with Python & Django
FROM python:3.11-slim as backend

# Environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy Django app
COPY backend/ ./backend

# Copy React static files to Django's static root
COPY --from=frontend /app/frontend/dist ./backend/static/

# Expose Django's default port
EXPOSE 8000

# Move into Django project directory (adjust if needed)
WORKDIR /app/backend

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
