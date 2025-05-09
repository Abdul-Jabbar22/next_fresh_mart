"use client";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare,
  BarChart2,
  Settings
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  
  const links = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="h-5 w-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { name: "Messages", href: "/admin/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Analytics", href: "/admin/analytics", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6 px-2">Admin Panel</h2>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100",
              pathname === link.href && "bg-gray-100 font-medium"
            )}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}