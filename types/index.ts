/**
 * @file types/index.ts
 * @description TypeScript 타입 정의
 *
 * 프로젝트 전반에서 사용되는 공통 타입 정의를 모아둔 파일입니다.
 */

// 사용자 역할 타입
export type UserRole = "buyer" | "seller" | "admin";

// 배송 방법 타입
export type ShippingMethod =
  | "pickup"
  | "standard"
  | "cargo"
  | "express"
  | "quick";

// 발주 상태 타입
export type OrderStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "preparing"
  | "shipped";

// 재고 거래 유형
export type StockTransactionType = "in" | "out" | "adjust";

// Audit Log 엔티티 타입
export type AuditEntityType =
  | "order"
  | "product"
  | "category"
  | "user"
  | "agency";

// Audit Log 액션 타입
export type AuditAction = "create" | "update" | "delete" | "status_change";

// 데이터베이스 테이블 타입 정의
export interface User {
  id: string;
  clerk_id: string;
  name: string;
  role: UserRole;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agency {
  id: string;
  user_id: string;
  code: string;
  business_number: string | null;
  name: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  level: 1 | 2 | 3;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  name: string;
  code: string | null;
  price: number;
  unit: string;
  description: string | null;
  manufacturer: string | null;
  brand: string | null;
  images: string[];
  min_stock: number;
  current_stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  id: string;
  buyer_id: string;
  agency_id: string;
  name: string;
  contact: string;
  postal_code: string | null;
  address: string;
  detail_address: string | null;
  shipping_method: ShippingMethod;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  shipping_method: ShippingMethod;
  shipping_address_id: string | null;
  shipping_address: Record<string, unknown> | null;
  request_note: string | null;
  status: OrderStatus;
  rejection_reason: string | null;
  approved_by: string | null;
  approved_at: string | null;
  shipped_at: string | null;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface StockTransaction {
  id: string;
  product_id: string;
  transaction_type: StockTransactionType;
  quantity: number;
  previous_stock: number;
  current_stock: number;
  reference_id: string | null;
  reason: string | null;
  created_by: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface OrderModificationLog {
  id: string;
  order_id: string;
  modified_by: string;
  modified_at: string;
  previous_data: Record<string, unknown>;
  changed_data: Record<string, unknown>;
  change_fields: string[];
  change_reason: string | null;
}

export interface OrderDeletionLog {
  id: string;
  order_id: string;
  deleted_by: string;
  deleted_at: string;
  order_data: Record<string, unknown>;
  deletion_reason: string | null;
}

export interface ProductDeletionLog {
  id: string;
  product_id: string;
  deleted_by: string;
  deleted_at: string;
  product_data: Record<string, unknown>;
  deletion_reason: string | null;
}

export interface AuditLog {
  id: string;
  entity_type: AuditEntityType;
  entity_id: string;
  action: AuditAction;
  changed_by: string;
  changed_at: string;
  previous_data: Record<string, unknown> | null;
  current_data: Record<string, unknown>;
  change_fields: string[];
  change_description: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

