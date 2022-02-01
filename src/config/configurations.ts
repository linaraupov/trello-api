export default () => ({
  port: parseInt(process.env.PROT, 10) || 5000,
  database: {
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
