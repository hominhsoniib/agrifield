import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { ChangePasswordDialog } from "@/components/forms/ChangePasswordDialog";
import { SidebarNav, MobileNav } from "@/components/layout/SidebarNav";

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
    <div className="flex min-h-screen w-full bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar — desktop */}
      <aside className="hidden w-60 shrink-0 border-r border-neutral-200 bg-white md:flex md:flex-col dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex h-14 items-center gap-2 border-b border-neutral-200 px-4 dark:border-neutral-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-700 text-xs font-bold text-white shadow-xs">
            F
          </div>
          <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            FarmTrack
          </span>
        </div>

        <SidebarNav />

        {/* User profile & actions */}
        <div className="border-t border-neutral-200 p-3 space-y-1 dark:border-neutral-800">
          <p
            className="truncate px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400"
            title={user?.email}
          >
            {user?.email}
          </p>
          <ChangePasswordDialog />
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-neutral-600 hover:bg-neutral-100 transition-colors dark:text-neutral-300 dark:hover:bg-neutral-800/60"
            >
              <span aria-hidden>🚪</span>
              <span>Đăng xuất</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar — mobile */}
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 md:hidden dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            FarmTrack
          </span>
          <div className="flex items-center gap-2">
            <ChangePasswordDialog />
            <form action={signOut}>
              <button type="submit" className="text-sm text-neutral-500 dark:text-neutral-400">
                Đăng xuất
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Bottom nav — mobile */}
        <MobileNav />
      </div>
    </div>
  );
}
