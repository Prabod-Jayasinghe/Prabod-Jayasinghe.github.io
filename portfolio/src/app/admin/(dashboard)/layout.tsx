"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "portfolio_admin_session";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie.split("; ").some((row) => row.startsWith("portfolio_admin_session=1"));
    const session = localStorage.getItem(SESSION_KEY);
    if (hasCookie || session === "1") {
      setAuthed(true);
    } else {
      router.replace("/admin/login");
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;
  if (!authed) return null;
  return <>{children}</>;
}
