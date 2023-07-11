import PostType from '@/interfaces/post';
import { PostPresenter } from '@/lib/api';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
	allPosts: PostType[];
};

export default function Home({ allPosts }: Props) {
	return (
		<>
			<Head>
				<title>Static Blog with Next.js and Markdown</title>
			</Head>
			<div className='layout'>
				<header>
					<h1 className='font-bold text-4xl'>
						Static Blog with Next.js and Markdown
					</h1>
				</header>
				<ul className='p-3'>
					{allPosts.map((post, index) => (
						<li
							className={'hover:underline py-4 border-b hover:text-blue-500'}
							key={index}
						>
							<Link href={`/posts/${post.slug}`}>
								<h2 className='text-2xl'>{post.title}</h2>
								<time>
									<small>{post.date}</small>
								</time>
								<p className='line-clamp-3'>{post.description}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	const presenter = new PostPresenter();
	const allPosts = presenter.getAllPosts([
		'title',
		'date',
		'description',
		'slug',
	]);

	return {
		props: {
			allPosts,
		},
	};
};
