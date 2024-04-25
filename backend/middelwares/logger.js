
function logger(req, res, next) {
    console.log('logger...')
next()
}

export default logger
