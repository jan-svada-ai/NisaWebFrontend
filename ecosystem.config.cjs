module.exports = {
  apps: [
    {
      name: "vendy-reality-web",
      cwd: "/var/www/nisacentrum/vendy-reality-web",
      script: "npm",
      args: "run start",
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
