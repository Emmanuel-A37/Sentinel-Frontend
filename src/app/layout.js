import "./globals.css";
import { Fira_Sans } from 'next/font/google'

  const firaSans = Fira_Sans({
     subsets: ['latin'],
     display: 'swap',
     weight: '300' 
   })


export const metadata = {
  title: "Sentinel",
  description: " Get insights into performance, track errors, and optimize your endpoints effortlessly.",
   icons: {
    icon: "/favicon.ico", // This assumes it's in the /public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
