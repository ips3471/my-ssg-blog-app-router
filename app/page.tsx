import Link from 'next/link';
import presenter from './_api/api';

async function getPosts() {
	const allPosts = presenter.getAllPosts();
	return allPosts;
}

export default async function Page() {
	const allPosts = await getPosts();

	return (
		<ul className='layout'>
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
	);
}
