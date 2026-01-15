import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

import { LoginModalProvider } from "@/context/loginModalContext";
import LoginModal from "@/components/modals/LoginModal";
import { RegisterModalProvider } from "@/context/registerModalContext";
import RegisterModal from "@/components/modals/RegisterModal";
import { ForgotPasswordProvider } from "@/context/password/forgotPasswordModalContext";
import ForgotPasswordModal from "@/components/modals/password/ForgotPasswordModal";
import { ResetPasswordProvider } from "@/context/password/resetModalContext";
import ResetCodeModal from "@/components/modals/password/ResetCodeMailModal";
import { ChangePasswordModalProvider } from "@/context/password/changePasswordModalContext";
import ChangePasswordModal from "@/components/modals/password/ChangePassword";

import PaymentSuccessModalHandler from "@/components/PaymentSuccessModalHandler";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Move Plus | Seu kit de corrida, sem filas",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1767756515/logo1black_orvmck.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1767756342/logo1_lx6aky.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1767756515/logo1black_orvmck.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1767756342/logo1_lx6aky.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>

        <AuthProvider>
          <LoginModalProvider>
            <RegisterModalProvider>
              <ForgotPasswordProvider>
                <ResetPasswordProvider>
                  <ChangePasswordModalProvider>
                    <Header />
                    {children}
                    <PaymentSuccessModalHandler />
                    <Toaster position="top-center" />
                    <Footer />
                    <LoginModal />
                    <RegisterModal />
                    <ForgotPasswordModal />
                    <ResetCodeModal />
                    <ChangePasswordModal />
                  </ChangePasswordModalProvider>
                </ResetPasswordProvider>
              </ForgotPasswordProvider>
            </RegisterModalProvider>
          </LoginModalProvider>
        </AuthProvider>

      </body>
    </html >
  );
}
