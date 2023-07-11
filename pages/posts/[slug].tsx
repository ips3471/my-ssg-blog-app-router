import PostType from '@/interfaces/post';
import { PostPresenter } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
	post: PostType;
};

export default function Post({ post }: Props) {
	return (
		<div>
			{post.slug}
			{post.content}
		</div>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const presenter = new PostPresenter();
	const fields = ['title', 'date', 'content', 'description'];
	const post = presenter.getPostBySlug(fields, params.slug);
	const htmlString = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				slug: 'first-content',
				content: `<h1>first content</h1>`,
			},
		},
	};
}

export async function getStaticPaths() {
	const presenter = new PostPresenter();
	const posts = presenter.getAllPosts(['slug']);

	return {
		paths: posts.map(post => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
