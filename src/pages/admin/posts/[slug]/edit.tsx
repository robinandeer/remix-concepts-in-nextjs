import AdminLayout from '~/components/admin-layout';
import type {CompletePost} from '~/post';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import type {Props as PostProps} from '~/pages/posts/[slug]';
import type {Props as PostsProps} from '~/pages/index';
import {getServerSideProps as getPostServerSideProps} from '~/pages/posts/[slug]';
import {getServerSideProps as getPostsServerSideProps} from '~/pages/index';
import invariant from 'tiny-invariant';
import {useForm} from '~/use-form';

type Props = PostProps & PostsProps;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const postProps = await getPostServerSideProps(context);
  const postsProps = await getPostsServerSideProps(context);

  invariant('props' in postProps, 'expected props in postProps');
  invariant('props' in postsProps, 'expected props in postsProps');

  return {
    props: {
      ...(await postProps.props),
      ...(await postsProps.props),
    },
  };
};

export default function AdminEdit({slug, posts, post}: Props) {
  const {submission, errors, formProps} = useForm<CompletePost>({
    action: `/api/posts/${slug}`,
    method: 'put',
  });

  return (
    <AdminLayout posts={posts}>
      <p>
        Edit: <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </p>

      <form {...formProps}>
        <p>
          <label>
              Post title:{' '}
            {errors?.title ? <em>Title is required</em> : null}
            <input key={post.title} type="text" name="title" required defaultValue={post.title} />
          </label>
        </p>

        <p>
          <label>
              Post slug:{' '}
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
            {submission ? 'Updating post...' : 'Update post'}
          </button>
        </p>
      </form>
    </AdminLayout>
  );
}
