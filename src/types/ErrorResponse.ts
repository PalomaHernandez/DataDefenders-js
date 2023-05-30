export default interface ErrorResponse {
    response: {
        status: number,
        data: {
            message: string,
            errors: {
                [key: string]: string[]
            }
        }
    }
}