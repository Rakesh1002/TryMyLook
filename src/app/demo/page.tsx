import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DemoWrapper from "../components/DemoWrapper";

export default async function DemoPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return <DemoWrapper />;
}
