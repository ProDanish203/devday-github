export interface PaginationTypes {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
  nextPage: null | number;
  prevPage: null | number;
  totalItems: number;
  totalPages: number;
}

export interface UserTypes {
  _id: number;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  country?: string;
  isEmailVerified: boolean;
  role: "admin" | "member";
  avatar?: {
    url: string;
    oublic_id: string;
  };
}
