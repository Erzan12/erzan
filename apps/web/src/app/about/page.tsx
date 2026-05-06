import AboutClient from "@/components/core/about/about-client";
import { authOptions } from "@/lib/auth/auth";
import { requireAdmin } from "@/lib/route-protection/user-check";
import { getServerSession } from "next-auth";

export default async function About() {
  const session = await getServerSession(authOptions); // make a page accessible to other users regardless if admin or ordinary users, ordinary users can only view posts while admin can view and create posts
  const avatar = session?.user.image;

  return (
    <AboutClient avatar={avatar} />
  );
}