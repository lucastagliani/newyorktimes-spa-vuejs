start:
	npm run start

install:
	npm run install

test:
	npm run build
	npm run test:unit
	docker-compose build
	docker-compose up -d
	npm run test:e2e:headless
	docker-compose down
