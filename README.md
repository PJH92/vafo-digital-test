# Vafo Digital - Lambda Test

A serverless AWS Lambda microservice written in TypeScript that analyzes text sent to it via an HTTP API Gateway. Infrastructure is managed with Terraform. Unit tests are written with Vitest.

## Deployment

### 1. Package and Upload Lambda

With AWS CLI configured, use the provided `deploy.sh` script to test, build, package, upload, and deploy:

```sh
chmod +x deploy.sh
./deploy.sh         # Deploys dev environment
./deploy.sh prod   # Deploys prod environment
```

### 2. Destroy Infrastructure

To tear down the infrastructure:
```sh
chmod +x destroy.sh
./destroy.sh         # Destroys dev environment
./destroy.sh prod   # Destroys prod environment
```