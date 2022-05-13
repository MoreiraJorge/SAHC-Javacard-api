import Router from 'koa-router'

import checkStatusRouter from './checkStatus/checkStatus.js'
import sessionRouter from './session/session.js'

const apiRouter = new Router({ prefix: '/api' })

apiRouter.use('', checkStatusRouter)
apiRouter.use('/session', sessionRouter)

export default apiRouter.routes()
