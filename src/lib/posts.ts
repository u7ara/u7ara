import { getCollection, type CollectionEntry } from 'astro:content';
import { readingMinutes } from './reading';

export type Post = {
  /** Collection entry id, used as the URL slug. */
  slug: string;
  title: string;
  description: string;
  date: Date;
  /** Estimated reading time in whole minutes, computed from the body. */
  minutes: number;
  /** The underlying entry, needed by render() on the post page. */
  entry: CollectionEntry<'blog'>;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatPostDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function toPost(entry: CollectionEntry<'blog'>): Post {
  return {
    slug: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    date: entry.data.date,
    minutes: readingMinutes(entry.body),
    entry,
  };
}

/** Published posts, newest first. Drafts and future-dated posts are excluded. */
export async function getPosts(): Promise<Post[]> {
  const now = Date.now();
  const entries = await getCollection(
    'blog',
    (entry) => !entry.data.draft && entry.data.date.getTime() <= now,
  );

  return entries
    .map(toPost)
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.title.localeCompare(b.title));
}

/** Same as getPosts(), grouped by calendar year (newest year first). */
export async function getPostsByYear(): Promise<{ year: number; posts: Post[] }[]> {
  const posts = await getPosts();
  const groups = new Map<number, Post[]>();

  for (const post of posts) {
    const year = post.date.getUTCFullYear();
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
  }

  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, entries]) => ({ year, posts: entries }));
}
