import digestData from '@/data/stack-digest.json';

export interface DigestPost {
  slug: string;
  repoName: string;
  githubUrl: string;
  trendshiftUrl?: string;
  language: string;
  stars: number;
  postedAt: string;
  imageUrl?: string;
  content: {
    title: string;
    summary: string;
    benefit: string;
    use_cases: string[];
    tags: string[];
  };
}

export const digestPosts: DigestPost[] = digestData.posts;

export function digestPostPath(post: DigestPost): string {
  return `/ru/stack/digest/${encodeURIComponent(post.slug)}`;
}
