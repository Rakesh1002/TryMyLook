import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, name, image } = await request.json();

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      image,
    },
    update: {
      name,
      image,
    },
  });

  return Response.json(user);
}
