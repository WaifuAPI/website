import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/pages/global/Loader";

export default function ToolsRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.replace("/dashboard/tools/users").then(() => setLoading(false));
  }, [router]);

  return loading ? <Loader /> : null;
}
