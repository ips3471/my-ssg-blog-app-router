import { getAllPosts, getPostBySlug } from '@/app/_api/api';
import PostItem from './post-item';

type Props = {
	params: {
		slug: string;
	};
};

async function getPost(slug: string) {
	return await getPostBySlug(slug);
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	const paths = posts.map(post => ({ slug: post.slug }));
	return paths;
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(params.slug);

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function Page({ params }: Props) {
	const post = await getPost(params.slug);

	return (
		<div className='layout'>
			<PostItem content={post.content || ''} />
		</div>
	);
}
