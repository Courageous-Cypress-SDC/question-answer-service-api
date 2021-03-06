events {
  worker_connections 768;
}

http {
  upstream servers_backend {
    server 54.219.4.157;
    server 13.56.179.92;
    server 54.215.56.137;
  }

  server {
    listen 80;
    server_name _;

    location / {
      proxy_set_header HOST $host;
      proxy_set_header X- Forwarded - Proto $scheme;
      proxy_set_header X - Real - IP $remote_addr;
      proxy_set_header X - Forwarded - For $proxy_add_x_forwarded_for;
      proxy_pass http://servers_backend$uri;
    }
  }

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include / etc / nginx / mime.types;
  default_type application / octet - stream;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

  access_log /var/log/nginx / access.log;
  error_log /var/log/nginx / error.log;

  gzip on;
}

