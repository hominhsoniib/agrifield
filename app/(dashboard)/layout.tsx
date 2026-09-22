import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tổng quan", icon: "🏠" },
  { href: "/farms", label: "Nông trại", icon: "🌾" },
  { href: "/growing-areas", label: "Vùng trồng", icon: "🗺️" },
  { href: "/fertilizer-logs", label: "Bón phân", icon: "🧪" },
  { href: "/care-logs", label: "Chăm sóc", icon: "🌱" },
  { href: "/expenses", label: "Chi phí", icon: "💰" },
  { href: "/reports", label: "Báo cáo", icon: "📊" },
  { href: "/settings", label: "Cài đặt", icon: "⚙️" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar — desktop */}
      <aside className="hidden w-60 shrink-0 border-r border-neutral-200 bg-white md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 border-b border-neutral-200 px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-700 text-xs font-semibold text-white">
            F
          </div>
          <span className="text-sm font-semibold text-neutral-900">
            FarmTrack
          </span>
        </div>

        <nav className="flex-1 space-y-0.5 p-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-neutral-200 p-3">
          <p className="truncate px-1 text-xs text-neutral-500">
            {user?.email}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 w-full rounded-md px-3 py-1.5 text-left text-sm text-neutral-600 hover:bg-neutral-100"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar — mobile */}
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 md:hidden">
          <span className="text-sm font-semibold text-neutral-900">
            FarmTrack
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-neutral-500"
            >
              Đăng xuất
            </button>
          </form>
        </header>

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Bottom nav — mobile */}
        <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-neutral-200 bg-white md:hidden">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] text-neutral-600"
            >
              <span aria-hidden className="text-base leading-none">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
