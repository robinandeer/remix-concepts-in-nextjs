import AdminLayout from '~/components/admin-layout';
import type {Props} from './index';
import {useForm} from '~/use-form';

export {getServerSideProps} from './index';

export default function NewPost({posts}: Props) {
  const {submission, errors, formProps} = useForm({
    action: '/api/posts',
  });

  return (
    <AdminLayout posts={posts}>
      <form {...formProps}>
        <p>
          <label>
            Post title: {' '}
            {errors?.title ? <em>Title is required</em> : null}
            <input type="text" name="title" />
          </label>
        </p>

        <p>
          <label>
            Post slug:{' '}
            {errors?.slug ? <em>Slug is required</em> : null}
            <input type="text" name="slug" />
          </label>
        </p>

        <p>
          <label htmlFor="markdown">Markdown: </label>
          {errors?.markdown ? <em>Markdown is required</em> : null}
          <br />
          <textarea id="markdown" name="markdown" rows={20} />
        </p>

        <p>
          <button type="submit">
            {submission ? 'Creating post...' : 'Create post'}
          </button>
        </p>
      </form>
    </AdminLayout>
  );
}
