import Router from "koa-router"

import checkStatusRouter from "./checkStatus/checkStatus.js"

const apiRouter = new Router({ prefix: '/api'});
apiRouter.use('', checkStatusRouter);

export default apiRouter.routes();