import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "./Loader";
import Maintenance from "./Maintenance";
import Restricted from "./Restricted";
import StaffRestricted from "./StaffRestricted";
import BetaRestricted from "./BetaRestricted";
import ServiceNotAvailable from "./ServiceNotAvailable";

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

export default function ContentWrapper({ pageName, children }) {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [serviceNotAvailable, setServiceNotAvailable] = useState(false);
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
        if (!data?.status === "ok" || !data?.page.content.available) {
          setMessage("This page is currently not available to the public.");
          return;
        }

        setAvailable(true);

        if (data.page.content.maintenance?.status) {
          setUnderMaintenance(true);
          setMessage(
            data.page.content.maintenance.message ||
              "Page is under maintenance. Please try again later."
          );
          return;
        }

        const requiredRoles = data.page.content?.permissions || [];
        if (requiredRoles.includes("guest")) {
          setAllowed(true);
          return;
        }

        const userCookie = Cookies.get("user");
        const user = userCookie ? JSON.parse(userCookie) : null;
        const userRoles = user?.id ? await fetchUserRoles(user?.id) : [];
        if (userRoles.some((role) => requiredRoles.includes(role))) {
          setAllowed(true);
        } else {
          determineRestriction(requiredRoles);
        }
        setServiceNotAvailable(data?.page?.content?.service?.available);
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

  if (!serviceNotAvailable) {
    return (
      <>
        <ServiceNotAvailable />
        {children}
      </>
    );
  }

  return <>{children}</>;
}
