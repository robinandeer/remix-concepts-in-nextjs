import { ActionFunction, LoaderFunction, redirect } from "remix";
import {CompletePost, updatePost} from '~/post.server'
import { Form, Link, useActionData, useLoaderData, useTransition } from "remix";

import type { PostError } from "../../new";
import { getPost } from "~/post.server";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }): Promise<CompletePost> => {
  invariant(params.slug, "expected params.slug")
  return await getPost(params.slug)
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors: PostError = {};
  if (!title) errors.title = true
  if (!slug) errors.slug = true
  if (!markdown) errors.markdown = true

  if (Object.keys(errors).length) {
    return errors
  }

  invariant(typeof params.slug === "string")
  invariant(typeof title === "string")
  invariant(typeof slug === "string")
  invariant(typeof markdown === "string")
  await updatePost(params.slug, { title, slug, markdown })

  return redirect(`/admin/posts/${slug}/edit`)
}  

export default function AdminIndex() {
  const post = useLoaderData<CompletePost>()
  const errors = useActionData<PostError>()
  const transition = useTransition()

  return (
    <div>
      <p>
        Edit: <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </p>

      <Form method="post">
        <p>
          <label>
            Post title:{" "}
            {errors?.title ? <em>Title is required</em> : null}
            <input key={post.title} type="text" name="title" required defaultValue={post.title} />
          </label>
        </p>

        <p>
          <label>
            Post slug:{" "}
            {errors?.slug ? <em>Slug is required</em> : null}
            <input key={post.slug} type="text" name="slug" required defaultValue={post.slug} />
          </label>
        </p>

        <p>
          <label htmlFor="markdown">Markdown: </label>
          {errors?.markdown ? <em>Markdown is required</em> : null}
          <br />
          <textarea key={post.markdown} id="markdown" name="markdown" rows={20} required defaultValue={post.markdown} />
        </p>

        <p>
          <button type="submit">
            {transition.submission ? "Updating post..." : "Update post"}
          </button>
        </p>
      </Form>
    </div>
  );
}
