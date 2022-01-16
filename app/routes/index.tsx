import { Link, useLoaderData } from "remix";

import type { LoaderFunction } from "remix";
import type { Post } from "~/post.server";
import { getPosts } from "~/post.server";

type LoaderData = Array<Post>

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return await getPosts()
}

export default function Index() {
  const posts = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}