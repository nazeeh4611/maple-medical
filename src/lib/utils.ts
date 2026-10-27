/** Joins class names, skipping falsy values. */
export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
