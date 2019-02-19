docker run -d --name caddy \
  -v $(pwd)/Caddyfile:/etc/caddy/Caddyfile \
  -v $(pwd)/build:/www \
  -p 80:80 \
  stefanprodan/caddy
