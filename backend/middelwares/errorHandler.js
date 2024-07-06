
const errorHandler = (error, req, res, next) => {
    res.status(500).send(`Something is failed.`)
}

export default errorHandler
