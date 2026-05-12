import axios from "axios";
import { supabase } from "@/lib/supabase/supabase";

export async function uploadOAuthAvatar(
  imageUrl: string,
  userId: string
) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const rawContentType = response.headers["content-type"];

    const contentType =
    typeof rawContentType === "string"
        ? rawContentType
        : "image/jpeg";

    const extension = contentType.split("/")[1];

    const fileName = `${userId}.${extension}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, response.data, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error(error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Avatar upload failed:", error);
    return null;
  }
}

// import { supabase } from "@/lib/supabase/supabase";

// export async function uploadOAuthAvatar(
//   imageUrl: string,
//   userId: string
// ): Promise<string | null> {
//   try {
//     // Use native fetch — handles redirects automatically
//     const response = await fetch(imageUrl, {
//       headers: {
//         // Helps with GitHub's CDN
//         "User-Agent": "Mozilla/5.0",
//       },
//     });

//     if (!response.ok) {
//       console.error("Failed to fetch avatar:", response.status, imageUrl);
//       return null;
//     }

//     const contentType = response.headers.get("content-type") ?? "image/jpeg";
    
//     // Strip params like "image/jpeg; charset=utf-8" → "image/jpeg"
//     const mimeType = contentType.split(";")[0].trim();
//     const extension = mimeType.split("/")[1] ?? "jpg";
//     const fileName = `${userId}.${extension}`;

//     // Get as ArrayBuffer — what Supabase actually expects
//     const arrayBuffer = await response.arrayBuffer();

//     const { error } = await supabase.storage
//       .from("avatars")
//       .upload(fileName, arrayBuffer, {
//         contentType: mimeType,
//         upsert: true,
//       });

//     if (error) {
//       console.error("Supabase upload error:", error.message);
//       return null;
//     }

//     const {
//       data: { publicUrl },
//     } = supabase.storage.from("avatars").getPublicUrl(fileName);

//     console.log("Avatar uploaded successfully:", publicUrl);
//     return publicUrl;

//   } catch (error) {
//     console.error("Avatar upload failed:", error);
//     return null;
//   }
// }