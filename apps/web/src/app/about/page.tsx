import AboutClient from "@/components/core/about/about-client";
import { getGithubProfile } from "@/components/github-profile/getProfile";

export default async function About() {
  const profile = await getGithubProfile();

  return (
    <AboutClient avatar={profile?.avatar_url} />
  );
}