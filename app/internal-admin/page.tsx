import { redirect } from "next/navigation";

export default function InternalAdminPage() {
  redirect("/internal-admin/site-content");
}
