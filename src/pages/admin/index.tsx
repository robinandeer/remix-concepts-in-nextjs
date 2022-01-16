import AdminLayout from '~/components/admin-layout';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import type {Post} from '~/post';
import {getPosts} from '~/post';

export type Props = {
  posts: Array<Post>
}

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    posts: await getPosts(),
  },
});

export default function Admin({posts}: Props) {
  return (
    <AdminLayout posts={posts}>
      <p>
        <Link href="/admin/new">Create a New Post</Link>
      </p>
    </AdminLayout>
  );
}
