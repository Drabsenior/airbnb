import getCurrentUser from "./actions/getCurrentUser";

import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./components/providers/ToasterProvider";

import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";

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
        <ToasterProvider />
        <RentModal />
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
