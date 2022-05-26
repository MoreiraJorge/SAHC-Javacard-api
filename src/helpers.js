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

export function asciiToHex(str) {
	return Array.from(str).map((ele) => {
		return "0x" + Number(ele.charCodeAt()).toString(16);
	}).join(' ')
}

export function numberToHex(num){
	if((num).toString(16).length === 1){
		return "0x0" + (num).toString(16)
	}
	return "0x" + (num).toString(16);
}

export function buffToHex(str){
	return str.replace(/(.{2})/g, "0x$1 ").trim()
}

export function getCipherSize(dataLen) {
	if ((dataLen % 8) == 0) {
		return dataLen + 8;
	}
	return dataLen + (8 - (dataLen % 8))
}