import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GoogleSignInForm from "../components/GoogleSignInForm";

export default async function SignInPage() {
  const session = await auth();

  // If the user is already logged in, redirect to the page they wanted to visit
  if (session?.user) {
    redirect("/demo");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50/30 via-cool-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-cool-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent mb-2">
              Welcome to TryMyLook
            </h1>
            <p className="text-cool-500">
              Sign in to access our virtual try-on demo
            </p>
          </div>

          <GoogleSignInForm />
        </div>
      </div>
    </div>
  );
}
