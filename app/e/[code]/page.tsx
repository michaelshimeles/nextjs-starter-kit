import { PublicEventClient } from './_components/PublicEventClient';

export default function PublicEventPage({ params }: { params: { code: string } }) {
  return <PublicEventClient code={params.code} />;
} 