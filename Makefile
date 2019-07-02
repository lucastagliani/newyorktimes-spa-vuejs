start:
	npm build
	npm start

install:
	npm install

test:
	npm run test:unit
	docker-compose build
	docker-compose up -d
	npm run test:e2e:headless
	docker-compose down
