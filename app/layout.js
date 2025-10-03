import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Providers from "./Providers";
import { roboto } from "./fonts";

export const metadata = {
    title: "Guess it",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
