import { AppImages } from "@/assets";
import Image from "next/image";
import React from "react";

const PixForm: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Image
                src={AppImages.pixQrCode}
                width={200}
                height={200}
                alt="Scan the QR code to pay it"
            />
            <h2>
                Aponte a camêra do seu celular para o QR Code acima ou copie e
                cole o link abaixo no app do seu banco.
            </h2>
        </div>
    );
};

export default PixForm;
