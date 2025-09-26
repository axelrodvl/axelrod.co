export function parseDate(value: string): Date {
  const [day, month, year] = value.split(".").map((segment) => Number(segment));

  if (!day || !month || !year) {
    throw new Error(`Invalid date format: ${value}`);
  }

  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDate(date: Date, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}
