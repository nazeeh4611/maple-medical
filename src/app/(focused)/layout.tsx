/** Task-focused pages (booking): no fixed mobile bar, so nothing can cover form fields. */
export default function FocusedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="flex-1">
      {children}
    </main>
  );
}
