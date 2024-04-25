import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isPublicPath = publicPaths.includes(path);

  const privatePaths = [
    "/",
    "/verify-email",
    "/settings",
    "/users",
    "/projects",
    "/projects/create",
    "/projects/:id",
    "/projects/:id/branches",
    "/projects/:id/update",
  ];
  const isPrivatePath = privatePaths.includes(path);

  const token = request.cookies.get("accessToken")?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/",
    "/verify-email",
    "/settings",
    "/users",
    "/projects",
    "/projects/create",
    "/projects/:id",
    "/projects/:id/branches",
    "/projects/:id/update",
  ],
};
