export const PREFERRED_HOSTNAME = "michaelnjodds.com";
export const CANONICAL_ORIGIN = `https://${PREFERRED_HOSTNAME}`;

export function normalizePathname(pathname: string): string {
  if (!pathname.startsWith("/")) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "");
  }
  return pathname;
}

export function buildCanonicalUrl(pathname: string): string {
  const normalized = normalizePathname(pathname);
  return normalized === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${normalized}`;
}

export function getCanonicalRedirectLocation({
  host,
  protocol,
  originalUrl,
}: {
  host: string | undefined;
  protocol: string | undefined;
  originalUrl: string;
}): string | null {
  const currentHost = (host || "").toLowerCase();
  const hostWithoutPort = currentHost.split(":")[0];
  const shouldNormalizeHost =
    hostWithoutPort === PREFERRED_HOSTNAME || hostWithoutPort === `www.${PREFERRED_HOSTNAME}`;

  const isWww = hostWithoutPort === `www.${PREFERRED_HOSTNAME}`;
  const needsHostRedirect = shouldNormalizeHost && isWww;

  const currentProtocol = (protocol || "http").toLowerCase();
  const needsProtocolRedirect = shouldNormalizeHost && currentProtocol !== "https";

  const parsed = new URL(originalUrl, CANONICAL_ORIGIN);
  const normalizedPath = normalizePathname(parsed.pathname);
  const needsSlashRedirect = normalizedPath !== parsed.pathname;

  if (!needsHostRedirect && !needsProtocolRedirect && !needsSlashRedirect) {
    return null;
  }

  const targetHost = PREFERRED_HOSTNAME;
  const targetProtocol = "https";
  return `${targetProtocol}://${targetHost}${normalizedPath}${parsed.search}`;
}
