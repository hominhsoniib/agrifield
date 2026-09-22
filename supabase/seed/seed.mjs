// Seed 1 tổ chức mẫu + 1 tài khoản admin cho FarmTrack.
// Chạy: npm run seed (đọc biến môi trường từ .env.local qua `node --env-file`, không hardcode secret).
//
// Vì sao dùng Admin API thay vì insert SQL thẳng vào auth.users: Supabase Auth tự quản lý
// mã hoá mật khẩu và các cột nội bộ của bảng auth.users — insert tay dễ sai và không được
// khuyến nghị chính thức. auth.admin.createUser() là cách an toàn, dùng service role key.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const ORG_NAME = process.env.SEED_ORG_NAME || "FarmTrack Demo Org";

function requireEnv(name, value) {
  if (!value) {
    console.error(`Thiếu biến môi trường ${name} trong .env.local — dừng seed.`);
    process.exit(1);
  }
}

requireEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
requireEnv("SUPABASE_SERVICE_ROLE_KEY", SERVICE_ROLE_KEY);
requireEnv("SEED_ADMIN_EMAIL", ADMIN_EMAIL);
requireEnv("SEED_ADMIN_PASSWORD", ADMIN_PASSWORD);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log("1/3 — Tạo/tìm tổ chức...");
  let { data: org, error: orgSelectErr } = await supabase
    .from("organizations")
    .select("id, name")
    .eq("name", ORG_NAME)
    .maybeSingle();
  if (orgSelectErr) throw orgSelectErr;

  if (!org) {
    const { data: newOrg, error: orgInsertErr } = await supabase
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id, name")
      .single();
    if (orgInsertErr) throw orgInsertErr;
    org = newOrg;
    console.log(`   Đã tạo tổ chức: ${org.name} (${org.id})`);
  } else {
    console.log(`   Tổ chức đã tồn tại: ${org.name} (${org.id})`);
  }

  console.log("2/3 — Tạo/tìm tài khoản admin...");
  let userId;
  const { data: existingUsers, error: listErr } =
    await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listErr) throw listErr;
  const existing = existingUsers.users.find((u) => u.email === ADMIN_EMAIL);

  if (existing) {
    userId = existing.id;
    console.log(`   Tài khoản admin đã tồn tại: ${ADMIN_EMAIL} (${userId})`);
  } else {
    const { data: created, error: createErr } =
      await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
    if (createErr) throw createErr;
    userId = created.user.id;
    console.log(`   Đã tạo tài khoản admin: ${ADMIN_EMAIL} (${userId})`);
  }

  console.log("3/3 — Tạo/cập nhật profile admin...");
  const { error: profileErr } = await supabase.from("profiles").upsert(
    {
      id: userId,
      organization_id: org.id,
      full_name: "Quản trị viên FarmTrack",
      role: "admin",
    },
    { onConflict: "id" }
  );
  if (profileErr) throw profileErr;

  console.log("\nHoàn tất seed:");
  console.log(`  Tổ chức: ${org.name} (${org.id})`);
  console.log(`  Admin:   ${ADMIN_EMAIL} / mật khẩu đã đặt trong .env.local`);
}

main().catch((err) => {
  console.error("Seed thất bại:", err.message || err);
  process.exit(1);
});
