export const handleResponse = (res, status, response) => {
    res.status(status).json(response)
}