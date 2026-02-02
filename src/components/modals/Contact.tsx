"use client";

import { X } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface ContactProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#1a1a1a] rounded-lg max-w-md w-full border border-orange-500/10">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Fale Conosco</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Email</h3>
                        <div className="flex justify-between items-center cursor-pointer gap-2 hover:bg-black/20 p-2 rounded">
                            <a
                                href="mailto:moveplusoficial@gmail.com"
                                className="text-orange-500 hover:text-orange-400 transition"
                            >
                                moveplusoficial@gmail.com
                            </a>
                            <span><FaLongArrowAltRight size={15} className="text-white" /></span>
                        </div>

                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">WhatsApp</h3>
                        <div className="flex justify-between items-center gap-2 cursor-pointer hover:bg-black/20 p-2 rounded">
                            <a
                                href="https://wa.me/5531996702827"
                                target="_blank"
                                className="text-orange-500 hover:text-orange-400 transition"
                            >
                                (31) 9670-2827
                            </a>
                            <span><FaLongArrowAltRight size={15} className="text-white" /></span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}