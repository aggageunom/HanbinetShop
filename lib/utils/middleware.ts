/**
 * @file lib/utils/middleware.ts
 * @description 미들웨어에서 사용할 유틸리티 함수
 *
 * 역할 기반 라우트 보호를 위한 헬퍼 함수들
 */

import type { UserRole } from "@/types";

/**
 * 라우트 경로와 필요한 역할 매핑
 */
export const routeRoles: Record<string, UserRole[]> = {
  "/products/manage": ["seller", "admin"],
  "/inventory": ["seller", "admin"],
  "/orders/received": ["seller", "admin"],
  "/orders/pending": ["admin"],
  "/orders/all": ["admin"],
  "/users": ["admin"],
  "/settings": ["admin"],
  "/settings/menu": ["admin"],
};

/**
 * 경로가 특정 역할을 요구하는지 확인
 */
export function requiresRole(pathname: string): UserRole[] | null {
  // 정확한 경로 매칭
  if (routeRoles[pathname]) {
    return routeRoles[pathname];
  }

  // 경로가 특정 prefix로 시작하는지 확인
  for (const [route, roles] of Object.entries(routeRoles)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }

  return null;
}

/**
 * 사용자 역할이 필요한 역할 중 하나인지 확인
 */
export function hasRequiredRole(
  userRole: UserRole | null,
  requiredRoles: UserRole[],
): boolean {
  if (!userRole) {
    return false;
  }

  // 관리자는 모든 권한 가짐
  if (userRole === "admin") {
    return true;
  }

  return requiredRoles.includes(userRole);
}

