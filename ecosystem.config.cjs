module.exports = {
  apps: [
    {
      name: "vendy-reality-web",
      cwd: "/var/www/nisacentrum/vendy-reality-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "768M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/var/www/nisacentrum/logs/web-error.log",
      out_file: "/var/www/nisacentrum/logs/web-out.log",
      time: true,
    },
  ],
};
