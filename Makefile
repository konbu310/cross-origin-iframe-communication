up:
	docker compose up -d

down:
	docker compose down

gen-cert:
	mkdir -p .cert
	mkcert \
		-cert-file cert.localhost.pem \
		-key-file key.localhost.pem  \
		host.localhost \
		guest.localhost
	mv cert.localhost.pem key.localhost.pem ./.cert
	