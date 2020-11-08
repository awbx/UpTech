const defaultConfig = {
  app: {
    port: process.env.PORT || 3000,
  },
  pattern: {
    username: /^[a-z0-9_-]{4,16}$/,
    password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    bio: /^[^\n]{2,100}$/,
  },
  jwtSecrets: {
    accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    confirmationSerectKey: process.env.JWT_CONFIRMATION_SECRET_KEY,
  },
  db: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
  },
  mailSmtp: {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_SMTP_USER,
      pass: process.env.MAIL_SMTP_PASS,
    },
  },
};

const development = { ...defaultConfig };

const production = {
  ...defaultConfig,
  db: {
    dbHost: process.env.DB_HOST_PRODUCTION,
    dbPort: process.env.DB_PORT_PRODUCTION,
    dbUser: process.env.DB_USER_PRODUCTION,
    dbPass: process.env.DB_PASS_PRODUCTION,
    dbName: process.env.DB_NAME_PRODUCTION,
  },
  app: {
    port: process.env.PORT || 8080,
  },
};

const config = {
  development,
  production,
};

module.exports = config[process.env.ENV];
