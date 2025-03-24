import "../styles/globals.css";

export const metadata = {
  title: "English Quiz App",
  description: "Test your English vocabulary skills!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-grey-100 min-h-screen">{children} </body>
    </html>
  );
}

