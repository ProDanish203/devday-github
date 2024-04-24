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
  _id: string;
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

export interface ProjectTypes {
  _id: string;
  name: string;
  desc: string;
  content: string;
  admin: {
    _id: string;
    username: string;
    name: string;
    avatar?: {
      url: string;
      public_id: string;
    };
  };
  members?: {
    user: {
      _id: string;
      username: string;
      name: string;
      avatar?: {
        url: string;
        public_id: string;
      };
    };
    status: string;
    _id: string;
  }[];
  children: any[];
}
