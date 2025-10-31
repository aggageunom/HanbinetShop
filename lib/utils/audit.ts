/**
 * @file lib/utils/audit.ts
 * @description 변경 추적 (Audit Log) 관련 유틸리티 함수
 *
 * 발주 수정, 삭제, 제품 삭제 등의 변경사항을 로그에 기록하는 기능을 제공합니다.
 */

import type {
  AuditEntityType,
  AuditAction,
  OrderModificationLog,
  OrderDeletionLog,
  ProductDeletionLog,
  AuditLog,
  Order,
  Product,
} from "@/types";
import { getServiceRoleClient } from "@/lib/supabase/service-role";

/**
 * 객체의 변경된 필드를 찾아 반환
 */
export function getChangedFields<T extends Record<string, unknown>>(
  previous: T,
  current: T,
): {
  changedFields: string[];
  changedData: Partial<T>;
} {
  const changedFields: string[] = [];
  const changedData: Partial<T> = {};

  for (const key in current) {
    if (Object.prototype.hasOwnProperty.call(current, key)) {
      if (previous[key] !== current[key]) {
        changedFields.push(key);
        changedData[key] = current[key];
      }
    }
  }

  return { changedFields, changedData };
}

/**
 * 발주 수정 로그 생성
 */
export async function logOrderModification(params: {
  orderId: string;
  modifiedBy: string;
  previousData: Partial<Order>;
  currentData: Partial<Order>;
  changeReason?: string;
}): Promise<OrderModificationLog | null> {
  try {
    const { changedFields, changedData } = getChangedFields(
      params.previousData as Record<string, unknown>,
      params.currentData as Record<string, unknown>,
    );

    if (changedFields.length === 0) {
      return null; // 변경사항이 없으면 로그 생성 안 함
    }

    const supabase = getServiceRoleClient();

    const { data, error } = await supabase
      .from("order_modification_logs")
      .insert({
        order_id: params.orderId,
        modified_by: params.modifiedBy,
        previous_data: params.previousData,
        changed_data: changedData,
        change_fields: changedFields,
        change_reason: params.changeReason || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create order modification log:", error);
      return null;
    }

    return data as OrderModificationLog;
  } catch (error) {
    console.error("Error logging order modification:", error);
    return null;
  }
}

/**
 * 발주 삭제 로그 생성
 */
export async function logOrderDeletion(params: {
  orderId: string;
  deletedBy: string;
  orderData: Order;
  deletionReason?: string;
}): Promise<OrderDeletionLog | null> {
  try {
    const supabase = getServiceRoleClient();

    const { data, error } = await supabase
      .from("order_deletion_logs")
      .insert({
        order_id: params.orderId,
        deleted_by: params.deletedBy,
        order_data: params.orderData,
        deletion_reason: params.deletionReason || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create order deletion log:", error);
      return null;
    }

    return data as OrderDeletionLog;
  } catch (error) {
    console.error("Error logging order deletion:", error);
    return null;
  }
}

/**
 * 제품 삭제 로그 생성
 */
export async function logProductDeletion(params: {
  productId: string;
  deletedBy: string;
  productData: Product;
  deletionReason?: string;
}): Promise<ProductDeletionLog | null> {
  try {
    const supabase = getServiceRoleClient();

    const { data, error } = await supabase
      .from("product_deletion_logs")
      .insert({
        product_id: params.productId,
        deleted_by: params.deletedBy,
        product_data: params.productData,
        deletion_reason: params.deletionReason || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create product deletion log:", error);
      return null;
    }

    return data as ProductDeletionLog;
  } catch (error) {
    console.error("Error logging product deletion:", error);
    return null;
  }
}

/**
 * 통합 Audit Log 생성
 */
export async function logAudit(params: {
  entityType: AuditEntityType;
  entityId: string;
  action: AuditAction;
  changedBy: string;
  previousData?: Record<string, unknown> | null;
  currentData: Record<string, unknown>;
  changeFields?: string[];
  changeDescription?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<AuditLog | null> {
  try {
    const supabase = getServiceRoleClient();

    const { data, error } = await supabase
      .from("audit_logs")
      .insert({
        entity_type: params.entityType,
        entity_id: params.entityId,
        action: params.action,
        changed_by: params.changedBy,
        previous_data: params.previousData || null,
        current_data: params.currentData,
        change_fields: params.changeFields || [],
        change_description: params.changeDescription || null,
        ip_address: params.ipAddress || null,
        user_agent: params.userAgent || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create audit log:", error);
      return null;
    }

    return data as AuditLog;
  } catch (error) {
    console.error("Error logging audit:", error);
    return null;
  }
}
