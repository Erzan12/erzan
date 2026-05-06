import AboutClient from "@/components/core/about/about-client";
import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function About() {
  const session = await requireAdmin();
  const avatar = session?.user.image;

  return (
    <AboutClient avatar={avatar} />
  );
}