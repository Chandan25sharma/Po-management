import { SessionProvider } from '@/components/providers/SessionProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
