export default interface SuccessfulResponse {
    data: {
        res: boolean,
        text: string,
        [key: symbol]: object
    }
}