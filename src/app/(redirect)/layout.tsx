import "../globals.css";

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-fg">{children}</body>
    </html>
  );
}
