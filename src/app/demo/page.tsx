import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DemoContent from "../components/DemoContent";

export default async function DemoPage() {
  const session = await auth();

  // Protect the route - redirect to sign in if not authenticated
  if (!session?.user) {
    redirect("/signin");
  }

  return <DemoContent />;
}
