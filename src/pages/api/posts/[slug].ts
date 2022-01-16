import type {NextApiRequest, NextApiResponse} from 'next';

import type {CompletePost} from '~/post';
import {getFormData} from '~/get-form-data';
import invariant from 'tiny-invariant';
import {updatePost} from '~/post';

export const config = {
	api: {
		bodyParser: false,
	},
};

type PostError = {
  title?: boolean
  slug?: boolean
  markdown?: boolean
}

type Data = CompletePost | { errors: PostError }

export default async function editPost(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {title, slug, markdown} = await getFormData(req);

	const errors: PostError = {};
	if (!title) {
		errors.title = true;
	}

	if (!slug) {
		errors.slug = true;
	}

	if (!markdown) {
		errors.markdown = true;
	}

	if (Object.keys(errors).length) {
		return res.status(400).json({errors});
	}

	invariant(typeof req.query.slug === 'string');
	invariant(typeof title === 'string');
	invariant(typeof slug === 'string');
	invariant(typeof markdown === 'string');

	const post = await updatePost(req.query.slug, {title, slug, markdown});

	res.redirect(`/admin/posts/${post.slug}/edit`);
}
