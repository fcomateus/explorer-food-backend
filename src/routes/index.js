const { Router } = require('express');

const usersRouter = require('./user.routes');
const sessionsRouter = require('./sessions.routes');
const categoriesRoutes = require('./categories.routes')
const dishesRoutes = require('./dishes.routes')

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use('/categories', categoriesRoutes)
routes.use('/dishes', dishesRoutes)

module.exports = routes