clean-server:
	go clean

clean-client:
	rm -rf public/dist

clean: 
	clean-server clean-client

build-server:
	go build

build-client:
	npm run build

build:
	build-server build-client