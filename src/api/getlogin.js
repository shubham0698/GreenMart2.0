import Cookies from "js-cookie";

export default function getLogin() {
  const data = Cookies.get("greenmart_user");

  // If cookie not found
  if (!data) return false;

  try {
    // URL decode
    const decoded = decodeURIComponent(data);

    // Remove "j:" prefix if exists
    const clean = decoded.startsWith("j:") ? decoded.substring(2) : decoded;

    // Parse JSON
    const user = JSON.parse(clean);

    return {
      uid: user.uid,
      username: user.username,
      email: user.email
    };
  } catch (err) {
    console.error("Error parsing cookie:", err);
    return false;
  }
}
