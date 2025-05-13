import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ComponentProps } from "react";

type AppSidebarProps = ComponentProps<typeof Sidebar>;

export const AppSidebar = ({ ...props }: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-4">
        <Link href="/">
          <p>Logo</p>
        </Link>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail></SidebarRail>
    </Sidebar>
  );
};
