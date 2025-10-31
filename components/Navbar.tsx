"use client";

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import { isAdmin, isSellerOrAdmin } from "@/lib/utils/role";
import { Bell } from "lucide-react";

/**
 * @file components/Navbar.tsx
 * @description 메인 네비게이션 바 컴포넌트
 *
 * 역할별 메뉴 표시, 알림 아이콘, 사용자 프로필 드롭다운을 포함합니다.
 * - 구매자: 대시보드, 상품, 발주 내역
 * - 판매자: 대시보드, 상품 관리, 재고 관리, 받은 발주
 * - 관리자: 대시보드, 승인 대기 발주, 전체 발주, 재고 현황, 사용자 관리, 환경설정
 */

const Navbar = () => {
  const { role, isLoading } = useUserRole();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-7xl mx-auto border-b">
      <Link href="/" className="text-2xl font-bold">
        의료기기 발주 시스템
      </Link>

      <nav className="flex gap-4 items-center">
        <SignedIn>
          {!isLoading && (
            <>
              {/* 공통 메뉴 */}
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  대시보드
                </Button>
              </Link>

              {/* 구매자 메뉴 */}
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  상품 조회
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" size="sm">
                  발주 내역
                </Button>
              </Link>

              {/* 판매자/관리자 메뉴 */}
              {isSellerOrAdmin(role) && (
                <>
                  <Link href="/products/manage">
                    <Button variant="ghost" size="sm">
                      상품 관리
                    </Button>
                  </Link>
                  <Link href="/inventory">
                    <Button variant="ghost" size="sm">
                      재고 관리
                    </Button>
                  </Link>
                  <Link href="/orders/received">
                    <Button variant="ghost" size="sm">
                      받은 발주
                    </Button>
                  </Link>
                </>
              )}

              {/* 관리자 전용 메뉴 */}
              {isAdmin(role) && (
                <>
                  <Link href="/orders/pending">
                    <Button variant="ghost" size="sm">
                      승인 대기
                    </Button>
                  </Link>
                  <Link href="/orders/all">
                    <Button variant="ghost" size="sm">
                      전체 발주
                    </Button>
                  </Link>
                  <Link href="/users">
                    <Button variant="ghost" size="sm">
                      사용자 관리
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost" size="sm">
                      환경설정
                    </Button>
                  </Link>
                </>
              )}

              {/* 알림 아이콘 (추후 구현) */}
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {/* 알림 배지는 추후 추가 */}
                </Button>
              </Link>
            </>
          )}
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button>로그인</Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Navbar;
