import {Link, Outlet, useLoaderData} from "remix"
import type {LinksFunction, LoaderFunction} from "remix"

import type {Post} from "~/post.server"
import adminStyles from '~/styles/admin.css'
import {getPosts} from "~/post.server"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: adminStyles }]
}

export const loader: LoaderFunction = async (): Promise<Array<Post>> => {
  return await getPosts()
}

export default function Admin() {
  const posts = useLoaderData<Array<Post>>()

  return (
    <div className="admin">
      <nav>
        <Link to="/admin"><h1>Admin</h1></Link>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/admin/posts/${post.slug}/edit`}>{post.title}</Link>
            </li>
          ))}
        </ul>

        <Link to="/">Back</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
