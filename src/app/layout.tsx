import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/common/compoment/Theam";
import ConvexProvidor from "@/common/compoment/ConvexProvidor";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/hooks/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev_Motion",
  description: "Organize your life with Dev_Motion",
  icons: [
    {
      url: "/logo2.svg",
      href: "/logo2.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexProvidor>
          <EdgeStoreProvider>
            <ThemeProvider attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="Dev_Motion"
            >
              <Toaster position="bottom-center"
                toastOptions={{
                  style: {
                    backgroundColor: "#23384a",
                    color: "whitesmoke"
                  },
                }}
              />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexProvidor>
      </body>
    </html>
  );
}
