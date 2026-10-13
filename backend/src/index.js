
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const sqlRoutes = require('./routes/sql');
const pexelsRoutes = require('./routes/pexels');

const openaiRoutes = require('./routes/openai');



const usersRoutes = require('./routes/users');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const konsumensRoutes = require('./routes/konsumens');

const groomersRoutes = require('./routes/groomers');

const hewansRoutes = require('./routes/hewans');

const layanansRoutes = require('./routes/layanans');

const tarif_ukuransRoutes = require('./routes/tarif_ukurans');

const jadwal_groomersRoutes = require('./routes/jadwal_groomers');

const bookingsRoutes = require('./routes/bookings');

const pembayaransRoutes = require('./routes/pembayarans');

const riwayat_groomingsRoutes = require('./routes/riwayat_groomings');

const notifikasisRoutes = require('./routes/notifikasis');

const log_aktivitasRoutes = require('./routes/log_aktivitas');

const salon_settingsRoutes = require('./routes/salon_settings');


const getBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Sistem Janji Temu Grooming",
        description: "Sistem Janji Temu Grooming Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');


app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.use('/api/roles', passport.authenticate('jwt', {session: false}), rolesRoutes);

app.use('/api/permissions', passport.authenticate('jwt', {session: false}), permissionsRoutes);

app.use('/api/konsumens', passport.authenticate('jwt', {session: false}), konsumensRoutes);

app.use('/api/groomers', passport.authenticate('jwt', {session: false}), groomersRoutes);

app.use('/api/hewans', passport.authenticate('jwt', {session: false}), hewansRoutes);

app.use('/api/layanans', passport.authenticate('jwt', {session: false}), layanansRoutes);

app.use('/api/tarif_ukurans', passport.authenticate('jwt', {session: false}), tarif_ukuransRoutes);

app.use('/api/jadwal_groomers', passport.authenticate('jwt', {session: false}), jadwal_groomersRoutes);

app.use('/api/bookings', passport.authenticate('jwt', {session: false}), bookingsRoutes);

app.use('/api/pembayarans', passport.authenticate('jwt', {session: false}), pembayaransRoutes);

app.use('/api/riwayat_groomings', passport.authenticate('jwt', {session: false}), riwayat_groomingsRoutes);

app.use('/api/notifikasis', passport.authenticate('jwt', {session: false}), notifikasisRoutes);

app.use('/api/log_aktivitas', passport.authenticate('jwt', {session: false}), log_aktivitasRoutes);

app.use('/api/salon_settings', passport.authenticate('jwt', {session: false}), salon_settingsRoutes);

app.use(
    '/api/openai',
    passport.authenticate('jwt', { session: false }),
    openaiRoutes,
);
app.use(
    '/api/ai',
    passport.authenticate('jwt', { session: false }),
    openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes);
app.use(
  '/api/sql',
  passport.authenticate('jwt', { session: false }),
  sqlRoutes);

  
const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

module.exports = app;
