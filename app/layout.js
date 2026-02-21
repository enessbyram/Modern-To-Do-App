import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="antialiased bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}