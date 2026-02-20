"use client";

import { useState, useEffect } from "react";
import { AuthUser } from "@/types/user.type";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthStore();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <h1>Profile Page</h1>
      </>
    );
  }

  return <></>;
}
