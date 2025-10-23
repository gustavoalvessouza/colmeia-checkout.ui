import React from "react";
import { Payment } from "@/@types";

import PixForm from "./pix-form";
import CreditCardForm from "./credit-card-form";
import BankSlipForm from "./bank-slip-form";

interface PaymentMethodFormProps {
    paymentMethod: Payment.Method;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
    paymentMethod,
}) => {
    const forms = {
        [Payment.Method.PIX]: PixForm,
        [Payment.Method.CARD]: CreditCardForm,
        [Payment.Method.BOLETO]: BankSlipForm,
    };

    const FormComponent = forms[paymentMethod];

    return (
        <div className="w-full">
            <FormComponent />
        </div>
    );
};

export default PaymentMethodForm;
