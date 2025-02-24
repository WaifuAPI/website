import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/pages/global/Loader";

export default function ProfileRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.replace("/dashboard/profile/overview").then(() => setLoading(false));
  }, [router]);

  return loading ? <Loader /> : null;
}
