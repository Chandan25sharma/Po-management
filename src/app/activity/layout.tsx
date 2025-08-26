import { SessionProvider } from '@/components/providers/SessionProvider';

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
