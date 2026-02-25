import RoomClient from './RoomClient';

type Props = {
  params: Promise<{ token: string }>;
};

export default async function RoomPage({ params }: Props) {
  const { token } = await params;

  if (!token?.trim()) {
    return (
      <div className="dr-invalid">
        <div className="dr-invalid-card">
          <h1>Access Link Invalid</h1>
          <p>This deal room link appears to be incomplete. Please request a new private link.</p>
          <a href="/access">Request New Access Link</a>
        </div>
      </div>
    );
  }

  return <RoomClient />;
}
