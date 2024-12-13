import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DemoWrapper from "../components/DemoWrapper";

export const runtime = "edge";
export const preferredRegion = "sin1";

export default async function DemoPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return <DemoWrapper />;
}
