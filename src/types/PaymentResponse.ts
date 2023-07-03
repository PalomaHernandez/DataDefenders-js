export default interface PaymentResponse {
    data: {
        res: boolean,
        text: string,
        paymentUrl: string,
        applicationId: number,
    }
}