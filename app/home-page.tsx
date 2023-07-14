'use client';
import Link from 'next/link';
import { Item } from './_api/api';

interface Props {
	posts: Item[];
}

export default function HomePage({ posts }: Props) {
	return (
		<ul>
			{posts.map((post, index) => (
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
