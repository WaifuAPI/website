import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "./Loader";
import Maintenance from "./Maintenance";
import Restricted from "./Restricted";
import StaffRestricted from "./StaffRestricted";
import BetaRestricted from "./BetaRestricted";
import axios from "axios";

const STAFF_ROLES = [
  "developer",
  "super_admin",
  "admin",
  "database_moderator",
  "discord_moderator",
  "moderator",
  "community_manager",
  "support",
];

export default function PageWrapper({ pageName, children }) {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [underMaintenance, setUnderMaintenance] = useState(false);
  const [message, setMessage] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [restrictionType, setRestrictionType] = useState("general");

  useEffect(() => {
    const fetchUserRoles = async (userId) => {
      try {
        const res = await fetch(`/api/users/${userId}/roles`);
        const data = await res.json();
        return data.roles || [];
      } catch {
        return [];
      }
    };

    const determineRestriction = (roles) => {
      if (roles.some((role) => STAFF_ROLES.includes(role))) {
        setRestrictionType("staff");
      } else if (roles.includes("beta_tester")) {
        setRestrictionType("beta");
      }
    };

    const fetchValidation = async () => {
      try {
        const res = await fetch(`/api/validate?page=${pageName}`);
        const data = await res.json();
        if (!data?.status === "ok" || !data?.page.available) {
          setMessage("This page is currently not available to the public.");
          return;
        }

        setAvailable(true);

        if (data.page.maintenance?.status) {
          setUnderMaintenance(true);
          setMessage(
            data.page.maintenance.message || "This page is under maintenance."
          );
          return;
        }

        const requiredRoles = data.page.permission?.roles || [];
        if (requiredRoles.includes("guest")) {
          setAllowed(true);
          return;
        }

        const access_token = Cookies.get("access_token");
        const response = await axios.get("/api/discord/users/@me", {
          headers: { Authorization: access_token },
        });

        const userData = {
          id: response.data.id,
          username: response.data.username,
          avatar: response.data.avatar,
        };

        // Save user data in cache
        Cookies.set("user", JSON.stringify(userData), {
          expires: 7,
          secure: false,
          sameSite: "Strict",
          path: "/",
        });

        const user = response.data;
        const userRoles = user?.id ? await fetchUserRoles(user?.id) : [];
        if (userRoles.some((role) => requiredRoles.includes(role))) {
          setAllowed(true);
        } else {
          determineRestriction(requiredRoles);
        }
      } catch {
        setMessage("Error checking page availability.");
      } finally {
        setLoading(false);
      }
    };

    fetchValidation();
  }, [pageName]);

  if (loading) return <Loader />;
  if (!available) return <Restricted message={message} />;
  if (underMaintenance) return <Maintenance message={message} />;
  if (!allowed) {
    if (restrictionType === "staff") return <StaffRestricted />;
    if (restrictionType === "beta") return <BetaRestricted />;
    return <Restricted />;
  }

  return <>{children}</>;
}
