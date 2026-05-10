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