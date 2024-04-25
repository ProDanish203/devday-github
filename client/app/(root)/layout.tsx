import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { Toaster } from "sonner";
import { DashboardSidebar } from "@/components/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github",
  description: "A version control system for managing projects and defining user acces",
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <main className="bg-bg min-h-screen">
              <Toaster position="top-right" richColors />
              <DashboardSidebar>{children}</DashboardSidebar>
            </main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
