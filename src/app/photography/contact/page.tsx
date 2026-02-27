import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for photography inquiries',
};

export default function PhotographyContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg text-muted-foreground">
        Photography contact page. Content coming soon.
      </p>
    </div>
  );
}
