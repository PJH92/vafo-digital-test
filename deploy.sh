#!/bin/bash
# run with ./deploy.sh prod to deploy to production
# run with ./deploy.sh dev to deploy to dev

set -e

# === CONFIGURATION ===
LAMBDA_NAME="vafo-test"
ENVIRONMENT="${1:-dev}" # Pass 'prod' as first argument for production
S3_BUCKET="vafo-lambda-bucket-test"
if [ "$ENVIRONMENT" = "prod" ]; then
  S3_KEY="prod/${LAMBDA_NAME}.zip"
  TFVARS="prod.tfvars"
  BACKEND_VARS="backend-prod.tfvars"
else
  S3_KEY="dev/${LAMBDA_NAME}.zip"
  TFVARS="dev.tfvars"
  BACKEND_VARS="backend-dev.tfvars"
fi

# === BUILD LAMBDA ===
echo "Installing dependencies and building TypeScript..."
cd vafo-lambda-test
npm install
# run tests
npx vitest run
npm run build

# === PACKAGE LAMBDA ===
echo "Packaging Lambda deployment zip..."
rm -rf lambda-package vafo-test.zip
mkdir lambda-package
# Copy compiled JS files
cp dist/*.js lambda-package/
cd lambda-package
zip -r ../vafo-test.zip .
cd ..
rm -rf lambda-package

# === UPLOAD TO S3 ===
echo "Uploading Lambda zip to s3://${S3_BUCKET}/${S3_KEY}..."
aws s3 cp vafo-test.zip s3://${S3_BUCKET}/${S3_KEY}

# === DEPLOY WITH TERRAFORM ===
echo "Deploying infrastructure with Terraform..."
cd ../infra
terraform init -backend-config=${BACKEND_VARS} -reconfigure
terraform apply -var-file=${TFVARS} -auto-approve

# === OUTPUT API ENDPOINT ===
echo "Deployment complete. API endpoint:"
terraform output api_endpoint