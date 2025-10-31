/**
 * @file app/dashboard/page.tsx
 * @description 대시보드 페이지
 *
 * 역할에 따라 다른 대시보드 컨텐츠를 표시합니다.
 * - 구매자: 최근 발주 내역, 발주 상태 요약
 * - 판매자: 판매 현황, 재고 부족 상품
 * - 관리자: 전체 발주 현황, 승인 대기 수
 */

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { BuyerDashboard } from "@/components/dashboard/buyer-dashboard";
import { SellerDashboard } from "@/components/dashboard/seller-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const supabase = await createClerkSupabaseClient();
  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_id", userId)
    .single();

  const role = user?.role || "buyer";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      {role === "buyer" && <BuyerDashboard />}
      {role === "seller" && <SellerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

