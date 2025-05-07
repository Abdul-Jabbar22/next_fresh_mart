import { AdminSidebar } from "@/component/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}