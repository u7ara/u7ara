const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time in whole minutes from a Markdown body.
 * Code fences and common Markdown syntax are stripped before counting so
 * they don't inflate the result. Always returns at least 1.
 */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1;

  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .trim();

  if (!text) return 1;

  const words = text.split(/\s+/).filter((word) => /[a-z0-9]/i.test(word)).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
