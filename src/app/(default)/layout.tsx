import Navigation from "@/components/nav";
import Footer from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col justify-between min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
