import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch',
};

export default function PersonalContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg text-muted-foreground">
        Contact page. Content coming soon.
      </p>
    </div>
  );
}
