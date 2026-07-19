/** Merge conditional class names without a runtime dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Build a wa.me link with a pre-filled professional message. */
export function whatsappLink(number: string, message: string): string {
  const cleaned = number.replace(/[^\d]/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

/** Format a range of hours as a readable string. */
export function formatHourRange(min: number, max: number | null): string {
  if (max === null) return `${min}+ hours`;
  return `${min}–${max} hours`;
}

/** Clamp a number between two bounds. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
