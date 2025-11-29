type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <h1>Layout Products</h1>

      {children}
    </>
  );
}
