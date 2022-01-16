import fs from 'fs/promises'
import invariant from 'tiny-invariant'
import { marked } from 'marked'
import parseFrontMatter from 'front-matter'
import path from 'path'

export type Post = {
  slug: string;
  title: string;
  markdown: string;
}

export type CompletePost = Post & {
  html: string;
}

export type PostInput = Post & {
  markdown: string
}

export type PostMarkdownAttributes = {
  title: string;
}

const POSTS_PATH = path.join(__dirname, '../../posts');

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title !== undefined
}

export async function getPosts(): Promise<Array<Post>> {
  const dir = await fs.readdir(POSTS_PATH);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(POSTS_PATH, filename), 'utf8');
      const { attributes, body } = parseFrontMatter(file.toString());

      invariant(isValidPostAttributes(attributes), `${filename} has bad meta data`);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
        markdown: body
      }
    })
  )
}

export async function getPost(slug: string): Promise<CompletePost> {
  const filepath = path.join(POSTS_PATH, `${slug}.md`);
  const file = await fs.readFile(filepath, 'utf8');
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(isValidPostAttributes(attributes), `Post ${filepath} has missing attributes`);
  const html = marked(body);
  return { slug, html, title: attributes.title, markdown: body };
}

export async function createPost(post: PostInput) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(POSTS_PATH, `${post.slug}.md`),
    md,
  )
  return getPost(post.slug)
}

export async function updatePost(slug: string, newPost: PostInput) {
  await fs.rm(path.join(POSTS_PATH, `${slug}.md`))
  return createPost(newPost)
}
