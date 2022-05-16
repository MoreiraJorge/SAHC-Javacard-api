import Router from 'koa-router'

import checkStatusRouter from './checkStatus.js'
import sessionRouter from './session/session.js'
import applicationRouter from './application.js'

const apiRouter = new Router({ prefix: '/api' })

apiRouter.use('', checkStatusRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/applications', applicationRouter)

export default apiRouter.routes()
