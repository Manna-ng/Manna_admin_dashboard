'use client';
import { ArrowLeft, Bike, Package } from 'lucide-react';

export function ComingSoon({ type }: { type: 'Riders' | 'Products' }) {
  const Icon = type === 'Riders' ? Bike : Package;
  const description = type === 'Riders'
    ? 'Rider operations are not active in Manna yet. Delivery tracking will be handled through Kwik while this section remains on standby.'
    : 'Product management is not active in this admin build yet. Products will be managed through vendors when Manna enables this workflow.';
  return <section className="coming-soon-screen panel">
    <div className="coming-soon-icon"><Icon size={34} /></div>
    <span className="eyebrow">{type} management</span>
    <h1>{type} <span>coming soon</span></h1>
    <p>{description}</p>
    <div className="coming-soon-note">This section is intentionally disabled for the current Manna MVP.</div>
  </section>;
}
