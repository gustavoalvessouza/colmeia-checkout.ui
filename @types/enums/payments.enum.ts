export namespace Payment {
    export enum Method {
        PIX = "Pix",
        CARD = "Cartão",
        BOLETO = "Boleto",
    }

    export enum Status {
        PAID = "Paid",
        FAILED = "Failed",
        EXPIRED = "Expired",
    }
}
