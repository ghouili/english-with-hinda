module.exports = {
  apps: [
    {
      name: "front",
      script: "serve",
      cwd: "/var/www/learnenglish/front",

      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: "dist",
        PM2_SERVE_PORT: 8000,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",

      out_file: "/var/www/learnenglish/front/logs/front-out.log",
      error_file: "/var/www/learnenglish/front/logs/front-error.log",
      merge_logs: true,
    },

    {
      name: "server",
      script: "index.js",
      cwd: "/var/www/learnenglish/server",

      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",

      out_file: "/var/www/learnenglish/server/logs/server-out.log",
      error_file: "/var/www/learnenglish/server/logs/server-error.log",
      merge_logs: true,
    },
  ],
};
