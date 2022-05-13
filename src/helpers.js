export const handleErrorAsync = () => async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		console.log(err)
		ctx.response.status = err.statusCode
		ctx.response.body = err.message
	}
}

export function applicationException(message, statusCode) {
	const error = new Error(message)
	error.statusCode = statusCode || 500
	return error
}
