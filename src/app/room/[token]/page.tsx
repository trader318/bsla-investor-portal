import Navbar from '@/components/Navbar';

type Props = {
  params: Promise<{ token: string }>;
};

export default async function RoomPage({ params }: Props) {
  const { token } = await params;

  if (!token?.trim()) {
    return (
      <>
        <Navbar />
        <div className="pt-[72px] min-h-screen bg-primary-dark flex items-center justify-center p-8">
          <div className="text-center max-w-xl">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Access Link Invalid</h1>
            <p className="text-text-secondary mb-6">
              This deal room link appears to be incomplete. Please request a new private link.
            </p>
            <a href="/access" className="btn-p">Request New Access Link</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-[72px] min-h-screen bg-primary-dark">
        <div className="flex h-[calc(100vh-72px)]">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-text-primary mb-4">Secure Deal Room Access Granted</h1>
              <p className="text-lg text-text-secondary mb-8">
                Private access token validated.
              </p>
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-text-primary mb-3">What's Coming Next</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Private placement memorandum viewer</li>
                  <li>• Financial projections & due diligence</li>
                  <li>• Subscription document workflow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
