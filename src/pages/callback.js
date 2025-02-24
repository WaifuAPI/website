import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Error from "./error"; // Update the import path
import AuthLoader from "@/components/pages/global/AuthLoader";

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;
  const [authInProgress, setAuthInProgress] = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    if (code) {
      axios
        .post("/api/auth/discord", { code })
        .then((response) => {
          const { access_token } = response.data;

          Cookies.set("access_token", access_token, {
            expires: 1,
            sameSite: "Lax",
            secure: false,
          });
          router.push("/dashboard");
        })
        .catch((error) => {
          setTimeout(() => {
            setAuthInProgress(false);
            setShowErrorPage(true);
          }, 1000);
        });
    }
  }, [code, router]);

  return (
    <div>{authInProgress ? <AuthLoader /> : showErrorPage && <Error />}</div>
  );
}
