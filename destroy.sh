#!/bin/bash

# run with ./destroy.sh prod to destroy production
# otherwise it will destroy dev

set -e

# === CONFIGURATION ===
ENVIRONMENT="${1:-dev}" # Pass 'prod' as first argument for production
if [ "$ENVIRONMENT" = "prod" ]; then
  TFVARS="prod.tfvars"
  BACKEND_VARS="backend-prod.tfvars"
else
  TFVARS="dev.tfvars"
  BACKEND_VARS="backend-dev.tfvars"
fi

cd infra
echo "Initializing Terraform backend..."
terraform init -backend-config=${BACKEND_VARS}

echo "Destroying infrastructure for $ENVIRONMENT..."
terraform destroy -var-file=${TFVARS} -auto-approve

echo "Terraform destroy complete for $ENVIRONMENT." 