"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (isLoggedIn !== "true") {
      router.push("/");
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-poppins">
            Memuat dashboard...
          </p>
        </div>
      </div>
    );
  }

  return <DashboardLayout />;
}
