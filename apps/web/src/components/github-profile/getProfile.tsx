export async function getGithubProfile() {
  try {
    const res = await fetch("https://api.github.com/users/Erzan12", {
       next: { revalidate: 86400 }
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}