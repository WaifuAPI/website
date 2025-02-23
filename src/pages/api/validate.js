import { access } from "fs";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page, role, check } = req.query;

  // Simulated page access rules
  const pages = {
    home: {
      available: true,
      type: "production", // Options: production, alpha, beta
      mode: {
        maintenance: {
          status: false,
          message: "Page is under maintenance. Please try again later.",
        },
      },
      permission: {
        roles: ["admin", "member"],
      },
    },
    dashboard: {
      available: true,
      type: "production", // Options: production, alpha, beta
      mode: {
        maintenance: {
          status: false,
          message: "Page is under maintenance. Please try again later.",
        },
      },
      permission: {
        roles: ["admin", "member"],
      },
    },
    premium: {
      access: true,
      type: "production", // Options: production, alpha, beta
      mode: {
        maintenance: {
          status: false,
          message: "Page is under maintenance. Please try again later.",
        },
      },
      permission: {
        roles: ["admin", "member"],
      },
    },
  };

  let response = { status: "ok", page: {} };

  // Page Access Check
  if (check === "page" || !check) {
    if (!page || !pages[page]) {
      response.page = { available: false, reason: "Page not found" };
    } else {
      const pageData = pages[page];
      response.page = pageData;
      if (role && !pageData.roles.includes(role)) {
        response.page.access = false;
        response.page.reason = "Insufficient role permissions";
      }
    }
  }

  return res.status(200).json(response);
}
