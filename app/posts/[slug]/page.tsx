import presenter from '@/app/_api/api';
import PostItem from './post-item';

type Props = {
	params: {
		slug: string;
	};
};

async function getPost(slug: string) {
	return presenter.getPostBySlug(slug);
}

export async function generateMetadata({ params }: Props) {
	const slug = params.slug;
	const post = presenter.getPostBySlug(slug);

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

export async function generateStaticParams() {
	const allPosts = presenter.getAllPosts();
	const paths = allPosts.map(post => ({ slug: post.slug }));
	return paths;
}
