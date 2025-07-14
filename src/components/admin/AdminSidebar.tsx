"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  MessageSquare,
  Building,
  Users,
  Briefcase,
  Shield,
  Award,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  active?: boolean;
}

const SidebarItem = ({ href, icon: Icon, title, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-primary-100 hover:text-primary-900",
        active ? "bg-primary-100 text-primary-900 font-medium" : "text-gray-700"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

interface SidebarGroupProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-primary-100 hover:text-primary-900 text-gray-700">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            <span>{title}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10 space-y-1 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthContext();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full w-64 border-r bg-white">
      <div className="p-4">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Shield className="h-6 w-6" />
          <span>Awqef {t("admin.dashboard")}</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2 px-3 space-y-1">
        <SidebarItem
          href="/admin"
          icon={LayoutDashboard}
          title={t("admin.sidebar.dashboard")}
          active={pathname === "/admin"}
        />

        <SidebarGroup
          title={t("admin.sidebar.content")}
          icon={FileText}
          defaultOpen={pathname.includes("/admin/content")}
        >
          <SidebarItem
            href="/admin/content/posts"
            icon={FileText}
            title={t("admin.sidebar.posts")}
            active={pathname === "/admin/content/posts"}
          />
          <SidebarItem
            href="/admin/content/categories"
            icon={FolderTree}
            title={t("admin.sidebar.categories")}
            active={pathname === "/admin/content/categories"}
          />
          <SidebarItem
            href="/admin/content/comments"
            icon={MessageSquare}
            title={t("admin.sidebar.comments")}
            active={pathname === "/admin/content/comments"}
          />
        </SidebarGroup>

        <SidebarGroup
          title={t("admin.sidebar.projects")}
          icon={Briefcase}
          defaultOpen={pathname.includes("/admin/projects")}
        >
          <SidebarItem
            href="/admin/projects/list"
            icon={Briefcase}
            title={t("admin.sidebar.allProjects")}
            active={pathname === "/admin/projects/list"}
          />
          <SidebarItem
            href="/admin/projects/investments"
            icon={Building}
            title={t("admin.sidebar.investments")}
            active={pathname === "/admin/projects/investments"}
          />
          <SidebarItem
            href="/admin/projects/pledges"
            icon={Award}
            title={t("admin.sidebar.pledges")}
            active={pathname === "/admin/projects/pledges"}
          />
        </SidebarGroup>

        <SidebarGroup
          title={t("admin.sidebar.organizations")}
          icon={Building}
          defaultOpen={pathname.includes("/admin/organizations")}
        >
          <SidebarItem
            href="/admin/organizations/list"
            icon={Building}
            title={t("admin.sidebar.allOrganizations")}
            active={pathname === "/admin/organizations/list"}
          />
          <SidebarItem
            href="/admin/organizations/members"
            icon={Users}
            title={t("admin.sidebar.members")}
            active={pathname === "/admin/organizations/members"}
          />
        </SidebarGroup>

        <SidebarGroup
          title={t("admin.sidebar.compliance")}
          icon={Shield}
          defaultOpen={pathname.includes("/admin/compliance")}
        >
          <SidebarItem
            href="/admin/compliance/fatwas"
            icon={Shield}
            title={t("admin.sidebar.fatwas")}
            active={pathname === "/admin/compliance/fatwas"}
          />
          <SidebarItem
            href="/admin/compliance/certifications"
            icon={Award}
            title={t("admin.sidebar.certifications")}
            active={pathname === "/admin/compliance/certifications"}
          />
        </SidebarGroup>

        <SidebarItem
          href="/admin/settings"
          icon={Settings}
          title={t("admin.settings")}
          active={pathname === "/admin/settings"}
        />
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("admin.logout")}
        </Button>
      </div>
    </div>
  );
}
