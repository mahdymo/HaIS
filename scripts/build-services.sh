
#!/bin/bash

# Build all service images
echo "Building frontend..."
docker build -f docker/frontend/Dockerfile -t mis-platform/frontend:latest .

echo "Building API gateway..."
docker build -f docker/api-gateway/Dockerfile -t mis-platform/api-gateway:latest .

echo "Building JA4 service..."
docker build -f docker/ja4-service/Dockerfile -t mis-platform/ja4-service:latest .

echo "Building SPIRE service..."
docker build -f docker/spire-service/Dockerfile -t mis-platform/spire-service:latest .

echo "Building Correlation service..."
docker build -f docker/correlation-service/Dockerfile -t mis-platform/correlation-service:latest .

echo "Building Identity service..."
docker build -f docker/identity-service/Dockerfile -t mis-platform/identity-service:latest .

echo "Building Policy service..."
docker build -f docker/policy-service/Dockerfile -t mis-platform/policy-service:latest .

echo "Building Alert service..."
docker build -f docker/alert-service/Dockerfile -t mis-platform/alert-service:latest .

echo "Building Threat service..."
docker build -f docker/threat-service/Dockerfile -t mis-platform/threat-service:latest .

echo "All services built successfully!"
