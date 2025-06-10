
#!/bin/bash

# Deploy to Kubernetes
echo "Creating namespace..."
kubectl apply -f k8s/namespace.yaml

echo "Deploying frontend..."
kubectl apply -f k8s/frontend-deployment.yaml

echo "Deploying API gateway..."
kubectl apply -f k8s/api-gateway-deployment.yaml

echo "Deploying microservices..."
kubectl apply -f k8s/microservices-deployments.yaml

echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment --all -n mis-platform

echo "Getting service URLs..."
kubectl get services -n mis-platform

echo "Deployment complete!"
