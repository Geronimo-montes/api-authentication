export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  ASI_PORT: 3000,
  DB: {
    URI: process.env.MYSQL || 'mysql://root@127.0.0.1:3306/gestor_documentos_3',
  },
  MAIL: {
    EMAIL: 'gestor.documentos.app@gmail.com',
    PASSWORD: 'contrasena01'
  },
}