import type {NextApiRequest, NextApiResponse} from 'next';

import type {CompletePost} from '~/post';
import {createPost} from '~/post';
import {getFormData} from '~/get-form-data';
import invariant from 'tiny-invariant';

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

export default async function newPost(req: NextApiRequest, res: NextApiResponse<Data>) {
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

	invariant(typeof title === 'string');
	invariant(typeof slug === 'string');
	invariant(typeof markdown === 'string');

	await createPost({title, slug, markdown});

	res.redirect('/admin');
}
