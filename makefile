install:
	npm install

test:
	npm run test

start:
	@docker-compose up -d
	@npm run start:dev


lint:
	npm run lint

lint-fix:
	npm run lint --fix
