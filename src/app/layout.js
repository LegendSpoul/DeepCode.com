import { Toaster } from "@/components/ui/toaster";
import "./styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DeepCode.com",
  description: "Learn with Deepcode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
