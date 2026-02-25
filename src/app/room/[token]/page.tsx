import RoomClient from './RoomClient';
import { lookupToken } from '@/lib/tokenStore';

type Props = {
  params: Promise<{ token: string }>;
};

function InvalidAccess() {
  return (
    <div className="dr-invalid">
      <div className="dr-invalid-card">
        <h1>Invalid or Expired Access Link</h1>
        <p>This deal room link is invalid, expired, or has been revoked. Please request a new private link.</p>
        <a href="/access">Request New Access Link</a>
      </div>
    </div>
  );
}

export default async function RoomPage({ params }: Props) {
  const { token } = await params;

  if (!token?.trim()) {
    return <InvalidAccess />;
  }

  const tokenData = await lookupToken(token);
  if (!tokenData) {
    return <InvalidAccess />;
  }

  return <RoomClient token={token} investorName={tokenData.name || 'Investor'} />;
}
