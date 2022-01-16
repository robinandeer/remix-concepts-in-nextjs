import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import type {Post} from '~/post';
import {getPosts} from '~/post';

export type Props = {
  posts: Array<Post>;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    posts: await getPosts(),
  },
});

export default function Posts({posts}: Props) {
  return (
    <div>
      <h1>Posts</h1>

      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <footer>
        <Link href="/admin"><a>Admin</a></Link>
      </footer>
    </div>
  );
}
