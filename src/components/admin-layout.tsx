import Link from 'next/link';
import type {Post} from '~/post';
import type {ReactNode} from 'react';
import styles from '~/styles/admin.module.css';

type Props = {
  posts: Array<Post>
  children: ReactNode
}

export default function AdminLayout({posts, children}: Props) {
  return (
    <div className={styles.admin}>
      <nav>
        <Link href="/admin"><a><h1>Admin</h1></a></Link>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/admin/posts/${post.slug}/edit`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/">Back</Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}
