import { Link, LoaderFunction } from "remix"

import type {CompletePost} from "~/post.server"
import { getPost } from "~/post.server"
import invariant from "tiny-invariant"
import { useLoaderData } from "remix"

export const loader: LoaderFunction = async ({ params }): Promise<CompletePost> => {
  invariant(params.slug, "expected params.slug")
  return await getPost(params.slug)
}

export default function PostSlug() {
  const post = useLoaderData<CompletePost>()

  return (
    <div>
      <main>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
      </main>

      <footer>
        <Link to="/">Home</Link>
      </footer>
    </div>
  );
}
