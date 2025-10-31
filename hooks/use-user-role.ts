/**
 * @file hooks/use-user-role.ts
 * @description 사용자 역할 정보를 가져오는 React Hook
 *
 * Clerk 인증 정보를 바탕으로 Supabase에서 사용자의 역할 정보를 조회합니다.
 */

"use client";

import { useUser } from "@clerk/nextjs";
import { useClerkSupabaseClient } from "@/lib/supabase/clerk-client";
import { useEffect, useState } from "react";
import type { UserRole, User } from "@/types";

interface UseUserRoleReturn {
  role: UserRole | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * 현재 로그인한 사용자의 역할 정보를 가져오는 Hook
 */
export function useUserRole(): UseUserRoleReturn {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const supabase = useClerkSupabaseClient();
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isClerkLoaded || !clerkUser) {
      setIsLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("clerk_id", clerkUser.id)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (data) {
          setUser(data as User);
          setRole((data as User).role || "buyer");
        } else {
          // 사용자가 아직 동기화되지 않았을 수 있음
          setRole("buyer"); // 기본값
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setRole("buyer"); // 에러 시 기본값
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [clerkUser, isClerkLoaded, supabase]);

  return { role, user, isLoading, error };
}

