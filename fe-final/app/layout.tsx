import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import StoreProvider from "./StoreProvider";

import "./globals.css";
import Loading from "./Loading";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "WNC Final",
    description: "Generated by create next app",
};

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <StoreProvider>
                    <Suspense fallback={<Loading />}>
                        <Header/>
                        <article className="prose">{children}</article>
                    </Suspense>
                </StoreProvider>
            </body>
        </html>
    );
}
