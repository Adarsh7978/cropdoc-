"use client";

import { usePathname } from "next/navigation";
import { Leaf, LayoutDashboard, Stethoscope, MessageSquare } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = getPlaceholderImage("user-avatar");

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/diagnose", label: "Diagnose", icon: Stethoscope },
    { href: "/consult", label: "Consult Expert", icon: MessageSquare },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-primary">CropDoc AI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} prefetch={false}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
           <Avatar>
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">John Doe</span>
              <span className="text-xs text-muted-foreground">Farmer</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
