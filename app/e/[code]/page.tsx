import { PublicEventClient } from './_components/PublicEventClient';

export default async function PublicEventPage({ params }: { params: { code: string } }) {
  const { code } = await params;
  return <PublicEventClient code={code} />;
} 