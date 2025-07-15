variable "env" {
  description = "Environment (dev or prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "eu-west-1"
}

variable "lambda_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_memory_size" {
  description = "Memory size for Lambda"
  type        = number
  default     = 128
}

variable "lambda_timeout" {
  description = "Timeout for Lambda"
  type        = number
  default     = 10
}

variable "state_bucket" {
  description = "S3 bucket for Terraform state"
  type        = string
}

variable "lambda_s3_bucket" {
  description = "S3 bucket where Lambda zip is uploaded"
  type        = string
}

variable "lambda_s3_key" {
  description = "S3 key for Lambda zip file"
  type        = string
}
