migrate-all:
	docker exec -it trender-ru-app pnpm migrate
	docker exec -it trender-in-app pnpm migrate