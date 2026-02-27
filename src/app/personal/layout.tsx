import { Navbar } from '@/components/nav';

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar section="personal" />
      <main className="p-6">{children}</main>
    </div>
  );
}
