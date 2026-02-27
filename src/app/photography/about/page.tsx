import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the photographer',
};

export default function PhotographyAboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <p className="text-lg text-muted-foreground">
        Photography portfolio about page. Content coming soon.
      </p>
    </div>
  );
}
