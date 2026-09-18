import { NextResponse, type NextRequest } from "next/server";
import { defaultLanguage, isLanguage } from "@/i18n";

// The root has no page: send it to the browser's language, or to the default one.
export function middleware(request: NextRequest) {
  const preferred = request.headers
    .get("accept-language")
    ?.split(",")
    .map((tag) => tag.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find(isLanguage);

  return NextResponse.redirect(new URL(`/${preferred ?? defaultLanguage}`, request.url));
}

export const config = { matcher: "/" };
