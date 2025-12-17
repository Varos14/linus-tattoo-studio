export function getErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    if ((err as any).message && typeof (err as any).message === "string") return (err as any).message;
    if ((err as any).error && typeof (err as any).error === "string") return (err as any).error;
    if (typeof (err as any).toString === "function") {
      try {
        const str = (err as any).toString();
        if (typeof str === "string" && str.length) return str;
      } catch {
        // ignore
      }
    }
  }
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}
