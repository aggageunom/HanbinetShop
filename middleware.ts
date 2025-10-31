import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requiresRole, hasRequiredRole } from "@/lib/utils/middleware";
import type { UserRole } from "@/types";

/**
 * 보호할 라우트 목록
 * 인증이 필요한 페이지들
 */
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/products(.*)",
  "/orders(.*)",
  "/inventory(.*)",
  "/users(.*)",
  "/settings(.*)",
  "/agencies(.*)",
  "/addresses(.*)",
  "/notifications(.*)",
]);

/**
 * Clerk 미들웨어 확장
 * - 인증 확인
 * - 역할 기반 라우트 보호 (추후 구현 - 서버 사이드에서 역할 확인 필요)
 */
export default clerkMiddleware(async (auth, req) => {
  // 인증이 필요한 라우트 체크
  if (isProtectedRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // TODO: 역할 기반 라우트 보호는 서버 사이드에서 구현 필요
    // 현재는 클라이언트 사이드에서 Navbar를 통해 메뉴를 제한하고,
    // 각 페이지 컴포넌트에서 역할 체크를 수행
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
