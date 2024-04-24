export const ROLES = Object.freeze({
  ADMIN: "admin",
  MEMBER: "member",
});

export const STATUS = Object.freeze({
  PENDING: "pending",
  MEMBER: "member",
  ROLLOVER: "rollover",
});

export const STATUS_CODES = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
});
