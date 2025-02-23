import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

export default function RequireDiscordOAuth({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      Cookies.remove("user");
      router.push(
        `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`
      );
      return;
    }

    const validateToken = async () => {
      try {
        await axios.get("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (error) {
        Cookies.remove("access_token");
        Cookies.remove("user");
        router.push(
          `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`
        );
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// export default function RequireDiscordOAuth({ children }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const validateSession = async () => {
//       try {
//         // Request user session from the backend (which should store the token securely)
//         const { data } = await axios.get("/api/auth/session", { withCredentials: true });

//         if (!data || !data.user) {
//           throw new Error("No valid session found");
//         }
//       } catch (error) {
//         console.error("Session validation failed:", error);

//         // Redirect to Discord OAuth
//         router.push(
//           `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URL)}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     validateSession();
//   }, [router]);

//   if (loading) return null; // Prevents rendering content until authentication is checked

//   return <>{children}</>;
// }
