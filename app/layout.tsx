export const metadata = {
  title: "Low Res Viewer",
  description: "Simulate websites in low resolution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
