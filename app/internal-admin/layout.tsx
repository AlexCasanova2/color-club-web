import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "./styles.css";

export const metadata: Metadata = {
  title: "Internal admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function InternalAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
