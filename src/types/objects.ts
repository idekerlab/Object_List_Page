export interface Objects {
  [key: string]: any;
}

export interface PaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ObjectsResponse {
  hypotheses: Objects[];
  pagination: PaginationData;
} 