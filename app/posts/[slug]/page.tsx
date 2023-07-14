import { PostPresenter } from '@/app/_api/api';
import PostItem from './post-item';
import markdownToHtml from '@/app/_lib/markdownToHtml';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
	params: {
		slug: string;
	};
};

const presenter = new PostPresenter();

async function getPost(slug: string) {
	const post = presenter.getPostBySlug(
		['title', 'date', 'content', 'description'],
		slug,
	);
	const content = await markdownToHtml(post.content || '');

	return { ...post, content };
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = params.slug;

	const post = presenter.getPostBySlug(['title', 'description'], slug);

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function Page({ params }: Props) {
	const { slug } = params;
	const post = await getPost(slug);

	return (
		<div className='layout'>
			<PostItem content={post.content} />
		</div>
	);
}