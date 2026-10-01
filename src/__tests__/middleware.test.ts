/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function requestWith(acceptLanguage?: string) {
  const headers: Record<string, string> = acceptLanguage === undefined ? {} : { "accept-language": acceptLanguage };
  return new NextRequest("https://example.com/", { headers });
}

const target = (acceptLanguage?: string) => new URL(middleware(requestWith(acceptLanguage)).headers.get("location")!);

describe("middleware", () => {
  it("should send the root to the language the browser asks for", () => {
    expect(target("en").pathname).toBe("/en");
    expect(target("es").pathname).toBe("/es");
  });

  it("should fall back to the default language when the browser asks for one we do not have", () => {
    expect(target("fr-FR,fr;q=0.9,de;q=0.8").pathname).toBe("/es");
  });

  it("should fall back when there is no header at all", () => {
    expect(target().pathname).toBe("/es");
  });

  it("should match a regional tag to its base language", () => {
    expect(target("en-GB").pathname).toBe("/en");
    expect(target("es-419,es;q=0.9").pathname).toBe("/es");
  });

  it("should skip tags it cannot serve and take the first one it can", () => {
    expect(target("de,fr,en,es").pathname).toBe("/en");
  });

  it("should ignore case and surrounding spaces", () => {
    expect(target("EN-US, es;q=0.8").pathname).toBe("/en");
  });

  it("should redirect rather than rewrite, so the address bar shows the language", () => {
    const response = middleware(requestWith("en"));

    expect(response.status).toBe(307);
  });

  // Known limit: tags are taken in the order they arrive and q weights are not
  // compared, so a header that lists a lower-weighted tag first wins. Browsers send
  // them in descending order, so this does not come up in practice.
  it("should take the first supported tag, not the highest weighted one", () => {
    expect(target("en;q=0.1,es;q=0.9").pathname).toBe("/en");
  });
});
