import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modal/LoginModal";
import Modal from "./components/modal/Modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./components/providers/ToasterProvider";
import "./globals.css";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <Modal isOpen title="hellow world" actionLabel="Submit" /> */}
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
