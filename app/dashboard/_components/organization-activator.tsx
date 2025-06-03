"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useEffect } from "react";

export default function OrganizationActivator() {
  const { data: organizations } = authClient.useListOrganizations();

  useEffect(() => {
    const activateOrganization = async () => {
      try {
        if (organizations && organizations.length > 0 && organizations[0]?.id) {
          const response = await authClient.organization.setActive({
            organizationId: organizations[0].id,
          });
          
          console.log("Organization activated:", response.data);
        }
      } catch (error) {
        console.error("Failed to activate organization:", error);
      }
    };

    if (organizations) {
      activateOrganization();
    }
  }, [organizations]);

  return null;
}