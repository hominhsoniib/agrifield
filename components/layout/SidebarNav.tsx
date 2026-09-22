"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type SubItem = {
  href: string;
  label: string;
  icon: string;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
  children?: SubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Tổng quan",
    icon: "🏠",
    children: [
      { href: "/dashboard", label: "Bảng điều khiển", icon: "📊" },
      { href: "/about", label: "Giới thiệu hệ thống", icon: "📖" },
    ],
  },
  { href: "/farms", label: "Nông trại", icon: "🌾" },
  { href: "/growing-areas", label: "Vùng trồng", icon: "🗺️" },
  { href: "/fertilizer-logs", label: "Bón phân", icon: "🧪" },
  { href: "/care-logs", label: "Chăm sóc", icon: "🌱" },
  { href: "/harvest-logs", label: "Thu hoạch", icon: "🧺" },
  { href: "/inventory", label: "Vật tư", icon: "📦" },
  { href: "/expenses", label: "Chi phí", icon: "💰" },
  { href: "/reports", label: "Báo cáo", icon: "📊" },
  { href: "/users", label: "Người dùng", icon: "👥" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "/dashboard": true,
  });

  function toggleGroup(href: string) {
    setOpenGroups((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  }

  return (
    <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isChildActive = hasChildren
          ? item.children!.some((child) => pathname === child.href)
          : false;
        const isItemActive = pathname === item.href || isChildActive;
        const isOpen = openGroups[item.href] ?? isItemActive;

        if (hasChildren) {
          return (
            <div key={item.href} className="space-y-0.5">
              {/* Parent menu button */}
              <button
                type="button"
                onClick={() => toggleGroup(item.href)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isItemActive
                    ? "bg-emerald-50/80 text-emerald-900 font-semibold dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span aria-hidden>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="size-4 text-neutral-400" />
                ) : (
                  <ChevronRight className="size-4 text-neutral-400" />
                )}
              </button>

              {/* Sub-menu items */}
              {isOpen && (
                <div className="ml-4 pl-2 border-l border-neutral-200 space-y-0.5 dark:border-neutral-800">
                  {item.children!.map((child) => {
                    const isSubActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                          isSubActive
                            ? "bg-emerald-600 text-white font-medium shadow-xs"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-200"
                        }`}
                      >
                        <span aria-hidden>{child.icon}</span>
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
              isItemActive
                ? "bg-emerald-600 text-white font-medium shadow-xs"
                : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
            }`}
          >
            <span aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/dashboard", label: "Tổng quan", icon: "🏠" },
    { href: "/about", label: "Giới thiệu", icon: "📖" },
    { href: "/farms", label: "Nông trại", icon: "🌾" },
    { href: "/growing-areas", label: "Vùng trồng", icon: "🗺️" },
    { href: "/harvest-logs", label: "Thu hoạch", icon: "🧺" },
    { href: "/expenses", label: "Chi phí", icon: "💰" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-neutral-200 bg-white/95 backdrop-blur-md md:hidden dark:border-neutral-800 dark:bg-neutral-900/95">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] transition-colors ${
              isActive
                ? "text-emerald-700 font-bold dark:text-emerald-400"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            <span aria-hidden className="text-base leading-none">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
