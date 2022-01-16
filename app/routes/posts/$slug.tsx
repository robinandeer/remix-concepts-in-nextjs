import type {CompletePost} from "~/post.server"
import type { LoaderFunction } from "remix"
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
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}
