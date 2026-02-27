import { Navbar } from '@/components/nav';

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar section="photography" />
      <main className="p-6">{children}</main>
    </div>
  );
}
