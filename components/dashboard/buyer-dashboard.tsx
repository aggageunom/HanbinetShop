/**
 * @file components/dashboard/buyer-dashboard.tsx
 * @description 구매자 대시보드 컴포넌트
 *
 * 구매자 전용 대시보드:
 * - 최근 발주 내역
 * - 발주 상태 요약 (대기/승인/출고완료 수)
 * - 빠른 상품 검색
 */

"use client";

import { useClerkSupabaseClient } from "@/lib/supabase/clerk-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";

export function BuyerDashboard() {
  const supabase = useClerkSupabaseClient();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    shipped: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // 최근 발주 내역 조회 (최근 5개)
        const { data: orders } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (orders) {
          setRecentOrders(orders as Order[]);

          // 발주 상태별 집계
          const pending = orders.filter((o) => o.status === "pending").length;
          const approved = orders.filter(
            (o) => o.status === "approved" || o.status === "preparing",
          ).length;
          const shipped = orders.filter((o) => o.status === "shipped").length;

          setStats({ pending, approved, shipped });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [supabase]);

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 발주 상태 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">대기 중</h3>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">승인됨</h3>
          <p className="text-2xl font-bold text-blue-900">{stats.approved}</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">출고 완료</h3>
          <p className="text-2xl font-bold text-green-900">{stats.shipped}</p>
        </div>
      </div>

      {/* 최근 발주 내역 */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">최근 발주 내역</h2>
          <Link href="/orders">
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            발주 내역이 없습니다.
          </p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">발주 #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "approved" ||
                          order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status === "pending"
                      ? "대기 중"
                      : order.status === "approved"
                      ? "승인됨"
                      : order.status === "preparing"
                      ? "출고 준비 중"
                      : order.status === "shipped"
                      ? "출고 완료"
                      : "거부됨"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 빠른 상품 검색 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">빠른 상품 검색</h2>
        <Link href="/products">
          <Button className="w-full">상품 보기</Button>
        </Link>
      </div>
    </div>
  );
}

