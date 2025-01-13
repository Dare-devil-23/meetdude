import type { Metadata } from "next";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/store/Provider";
export const metadata: Metadata = {
  title: "MeetDude",
  description: "Meet your friends virtually on metaverse.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="sunset">
        <Providers>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
            className="rounded-xl"
          />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;