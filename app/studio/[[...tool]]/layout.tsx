export const metadata = {
  title: 'Kırmızı Vosvos CMS',
  description: 'Content management for Kırmızı Vosvos website',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
