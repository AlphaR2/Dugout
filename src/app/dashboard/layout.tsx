import { Suspense } from "react";
import Loading from "./loading";
import Navigation from "@/components/ui/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen justify-center w-full bg-[#000610] flex">
      <Navigation />

      <main className="flex my-20 w-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
}
