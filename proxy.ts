import { NextRequest, NextResponse } from "next/server";

import { applyBrandRootToRequest } from "@hebbian/dna";

/** Next.js 16 proxy: Host → x-brand-root for downstream layouts. */
export function proxy(request: NextRequest) {
  const { requestHeaders } = applyBrandRootToRequest({
    headers: request.headers,
    nextUrl: request.nextUrl,
  });

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
};
