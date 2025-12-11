IMAGE_NAME=transcendence-img
CONTAINER_NAME=transcendence-ctn

run:
	@echo "=== Build de l'image Docker ==="
	docker build -t $(IMAGE_NAME) .
	@echo "=== Lancement du conteneur ==="
	docker run -d --name $(CONTAINER_NAME) -p 3000:3000 $(IMAGE_NAME)

clean:
	@echo "=== Arrêt du conteneur ==="
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
	@echo "=== Suppression de l'image ==="
	-docker rmi $(IMAGE_NAME)
	@echo "=== Suppression des donnees sauvgardees ==="
	-docker system prune -af --volumes

logs:
	@echo "=== Logs du conteneur ==="
	-docker logs $(CONTAINER_NAME)

access:
	@echo "=== Acces au conteneur ==="
	-docker exec -it $(CONTAINER_NAME) sh

status:
	docker ps -a | grep $(CONTAINER_NAME)
