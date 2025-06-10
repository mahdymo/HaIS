
# HaIS Platform - Containerized Microservices Architecture

This document describes the containerized microservices architecture for the Machine Identity Security Platform (Hawya Identity Security)

## Architecture Overview

The platform has been refactored into the following containerized services:

### Frontend Services
- **Frontend Container**: React-based dashboard (Port 80)
- **API Gateway**: Request routing and service orchestration (Port 3000)

### Microservices
- **JA4+ Service**: Fingerprint collection and analysis (Port 3001)
- **SPIRE Service**: Infrastructure monitoring and management (Port 3002)
- **Correlation Service**: Behavioral analysis and threat correlation (Port 3003)
- **Identity Service**: SPIFFE identity management (Port 3004)
- **Policy Service**: Zero-trust policy enforcement (Port 3005)
- **Alert Service**: Security notifications and alerts (Port 3006)
- **Threat Service**: Geographic threat intelligence (Port 3007)

### Supporting Services
- **PostgreSQL**: Shared database for persistent data
- **Redis**: Caching and pub/sub messaging

## Quick Start

### Docker Compose (Development)
```bash
# Build all services
chmod +x scripts/build-services.sh
./scripts/build-services.sh

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Kubernetes (Production)
```bash
# Build and tag images
./scripts/build-services.sh

# Deploy to Kubernetes
chmod +x scripts/deploy-k8s.sh
./scripts/deploy-k8s.sh

# Check deployment status
kubectl get pods -n hais-platform
kubectl get services -n hais-platform
```

## Service Communication

Services communicate through:
- **HTTP REST APIs** for synchronous operations
- **Redis pub/sub** for real-time event notifications
- **PostgreSQL** for shared data persistence

## Development

Each service can be developed independently:
1. Frontend automatically falls back to mock data when services are unavailable
2. Services include health check endpoints
3. API Gateway handles service discovery and load balancing

## Monitoring

- Service health checks on `/health` endpoints
- Centralized logging through Docker/Kubernetes
- Metrics collection via API Gateway
- Frontend displays service connection status

## Security

- Inter-service communication secured with JWT tokens
- Network isolation via Docker networks/Kubernetes namespaces
- Secrets managed through environment variables
- TLS termination at API Gateway

## Scaling

Services can be scaled independently:
- Frontend: Multiple replicas behind load balancer
- API Gateway: Horizontal scaling with session affinity
- Microservices: Auto-scaling based on CPU/memory usage
- Database: Read replicas and connection pooling
