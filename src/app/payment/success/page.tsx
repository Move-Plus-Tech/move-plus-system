"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function PaymentSuccess() {
    const router = useRouter();

    const handleOk = () => {
        router.push("/");
    };

    useEffect(() => {
        const elements = [
            document.body,
            document.documentElement,
            document.getElementById("__next"),
        ];

        elements.forEach((el) => {
            if (el) {
                el.style.overflow = "hidden";
                el.style.height = "100%";
            }
        });

        return () => {
            elements.forEach((el) => {
                if (el) {
                    el.style.overflow = "auto";
                    el.style.height = "auto";
                }
            });
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-[400px] h-[290px] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-6">
                <Image
                    src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765732227/icons8-ok_laxptw.gif"
                    alt="Success Icon"
                    width={48}
                    height={48}
                />
                <p className="mt-4 text-gray-700 text-center">
                    Tudo certo com seu pagamento! Sua inscrição <br />será confirmada em instantes.
                </p>

                <button
                    onClick={handleOk}
                    className="mt-8 w-[80%] h-12 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
