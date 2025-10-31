/**
 * @file lib/utils/role.ts
 * @description 사용자 역할 관련 유틸리티 함수
 *
 * 역할 확인, 역할 기반 권한 체크 등의 기능을 제공합니다.
 */

import type { UserRole } from "@/types";

/**
 * 역할이 관리자인지 확인
 */
export function isAdmin(role: UserRole | null | undefined): boolean {
  return role === "admin";
}

/**
 * 역할이 판매자인지 확인
 */
export function isSeller(role: UserRole | null | undefined): boolean {
  return role === "seller";
}

/**
 * 역할이 구매자인지 확인
 */
export function isBuyer(role: UserRole | null | undefined): boolean {
  return role === "buyer" || !role; // 기본값이 buyer
}

/**
 * 역할이 판매자 또는 관리자인지 확인
 */
export function isSellerOrAdmin(role: UserRole | null | undefined): boolean {
  return role === "seller" || role === "admin";
}

/**
 * 역할이 구매자 이상(구매자/판매자/관리자)인지 확인
 * 항상 true를 반환하지만 타입 체크용
 */
export function isBuyerOrAbove(role: UserRole | null | undefined): boolean {
  return true; // 모든 인증된 사용자는 최소 구매자 권한
}

/**
 * 역할의 표시명 반환
 */
export function getRoleDisplayName(role: UserRole | null | undefined): string {
  switch (role) {
    case "admin":
      return "관리자";
    case "seller":
      return "판매자";
    case "buyer":
    default:
      return "구매자";
  }
}

/**
 * 역할 기반 접근 권한 체크
 */
export function hasPermission(
  userRole: UserRole | null | undefined,
  requiredRole: UserRole | UserRole[],
): boolean {
  if (!userRole) {
    return false;
  }

  const requiredRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  // 관리자는 모든 권한 가짐
  if (userRole === "admin") {
    return true;
  }

  return requiredRoles.includes(userRole);
}

