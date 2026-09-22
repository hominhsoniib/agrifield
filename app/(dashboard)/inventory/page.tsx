import { createClient } from "@/lib/supabase/server";
import { canManageInventory } from "@/lib/permissions";
import { setInventoryItemActive } from "@/lib/actions/inventory-items";
import { InventoryItemFormDialog } from "@/components/forms/InventoryItemFormDialog";
import { ToggleActiveButton } from "@/components/logs/ToggleActiveButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function InventoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };
  const canManage = canManageInventory(profile?.role);

  const { data: items, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">
            Danh mục vật tư
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Danh mục tham chiếu — chỉ lưu thông tin vật tư, KHÔNG quản lý số
            lượng tồn kho hay nhập/xuất kho.
          </p>
        </div>
        {canManage && <InventoryItemFormDialog trigger="+ Thêm vật tư" />}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh mục: {error.message}
        </p>
      )}

      {!error && (items?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có vật tư nào trong danh mục.
        </div>
      )}

      {(items?.length ?? 0) > 0 && (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Giá tham khảo</TableHead>
                <TableHead>NCC</TableHead>
                <TableHead>Trạng thái</TableHead>
                {canManage && <TableHead />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items!.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category ?? "—"}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    {item.reference_price != null
                      ? item.reference_price.toLocaleString("vi-VN") + " đ"
                      : "—"}
                  </TableCell>
                  <TableCell>{item.supplier ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={item.is_active ? "secondary" : "destructive"}>
                      {item.is_active ? "Đang dùng" : "Ngừng dùng"}
                    </Badge>
                  </TableCell>
                  {canManage && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <InventoryItemFormDialog item={item} trigger="Sửa" />
                        <ToggleActiveButton
                          isActive={item.is_active ?? true}
                          onToggle={setInventoryItemActive.bind(
                            null,
                            item.id,
                            !(item.is_active ?? true)
                          )}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
