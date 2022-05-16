import Router from 'koa-router'

import checkStatusRouter from './checkStatus.js'
import applicationRouter from './application.js'

const apiRouter = new Router({ prefix: '/api' })
apiRouter.use('', checkStatusRouter)
apiRouter.use('/applications', applicationRouter)

export default apiRouter.routes()
