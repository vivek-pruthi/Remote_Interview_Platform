# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy frontend package files
COPY frontend/package*.json ./frontend/

# Configure npm for network reliability
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-timeout 600000

# Install dependencies
RUN npm install
RUN npm install --prefix frontend

# Copy frontend source
COPY frontend ./frontend

# Frontend environment variables
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ARG VITE_STREAM_API_KEY
ARG VITE_GLOT_TOKEN

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STREAM_API_KEY=$VITE_STREAM_API_KEY
ENV VITE_GLOT_TOKEN=$VITE_GLOT_TOKEN

# Build frontend
RUN npm run build --prefix frontend


# Stage 2: Run backend
FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Configure npm for network reliability
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-timeout 600000

# Install backend dependencies
RUN npm install --omit=dev --prefix backend

# Copy backend source
COPY backend ./backend

# Copy built React application
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Production environment
ENV NODE_ENV=production

# Render will provide PORT
EXPOSE 5000

# Start backend server
CMD ["node", "backend/src/server.js"]