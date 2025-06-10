
#!/bin/bash

# Build all service images
echo "Building frontend..."
docker build -f docker/frontend/Dockerfile -t hais-platform/frontend:latest .

echo "Building API gateway..."
docker build -f docker/api-gateway/Dockerfile -t hais-platform/api-gateway:latest .

echo "Building JA4 service..."
docker build -f docker/ja4-service/Dockerfile -t hais-platform/ja4-service:latest .

echo "Building SPIRE service..."
docker build -f docker/spire-service/Dockerfile -t hais-platform/spire-service:latest .

echo "Building Correlation service..."
docker build -f docker/correlation-service/Dockerfile -t hais-platform/correlation-service:latest .

echo "Building Identity service..."
docker build -f docker/identity-service/Dockerfile -t hais-platform/identity-service:latest .

echo "Building Policy service..."
docker build -f docker/policy-service/Dockerfile -t hais-platform/policy-service:latest .

echo "Building Alert service..."
docker build -f docker/alert-service/Dockerfile -t hais-platform/alert-service:latest .

echo "Building Threat service..."
docker build -f docker/threat-service/Dockerfile -t hais-platform/threat-service:latest .

echo "All services built successfully!"
