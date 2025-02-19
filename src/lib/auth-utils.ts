"use server";

type UserData = {
  email: string;
  name?: string | null;
  image?: string | null;
};

export async function upsertUser(userData: UserData) {
  const response = await fetch("/api/auth/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to upsert user");
  }

  return response.json();
}
