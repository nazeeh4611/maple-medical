import { MobileActionBar } from "@/components/layout/mobile-action-bar";

/** Standard pages: main content plus the fixed mobile action bar (with clearance below). */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="main" className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      <MobileActionBar />
    </>
  );
}
