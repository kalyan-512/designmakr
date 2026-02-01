import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/SessionProvider";
import { Session } from "next-auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = (await getServerSession(authOptions)) as Session | null;
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
