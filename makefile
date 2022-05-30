build: 
	docker build . -t cpfarher/aws_sdk_client_sso_admin_nodejs

run-prod:
	docker run -p 8080:8080 --env-file prod.env cpfarher/aws_sdk_client_sso_admin_nodejs

run-dev:
	docker run -p 8080:8080 --env-file dev.env cpfarher/aws_sdk_client_sso_admin_nodejs	

start: build run-prod

start-dev: build run-dev
