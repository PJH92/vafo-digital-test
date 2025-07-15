output "api_endpoint" {
  description = "The API Gateway endpoint"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}
