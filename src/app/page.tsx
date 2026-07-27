import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingPage from "./new-landing/NewLandingHero";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return <LandingPage />;
}
