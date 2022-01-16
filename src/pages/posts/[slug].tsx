import type {CompletePost} from '~/post';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {getPost} from '~/post';
import invariant from 'tiny-invariant';

export type Props = {
  post: CompletePost
  slug: string
}

export const getServerSideProps: GetServerSideProps<Props> = async ({query}) => {
  invariant(typeof query.slug === 'string', 'expected query.slug');

  return {
    props: {
      slug: query.slug,
      post: await getPost(query.slug),
    },
  };
};

export default function PostSlug({post}: Props) {
  return (
    <div>
      <main>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
      </main>

      <footer>
        <Link href="/"><a>Home</a></Link>
      </footer>
    </div>
  );
}
