COMPOSE = docker compose -f docker-compose.yml
API_CONTAINER_NAME = hestia

.PHONY: build
build:
	$(COMPOSE) build

.PHONY: up
up: build
	$(COMPOSE) up -d

.PHONY: stop
stop:
	$(COMPOSE) stop

.PHONY: restart
restart:
	$(COMPOSE) restrt

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: log
log:
	docker logs $(API_CONTAINER_NAME) -f