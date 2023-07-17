'use client';

import { useEffect, useState } from 'react';
import TagType from '../__interfaces/tag';
import PostType from '../__interfaces/post';
import Link from 'next/link';
import TagButton from '../__components/tag-button';

interface Props {
	tags: TagType[];
	posts: PostType[];
}

function PageFilter({ posts, tags }: Props) {
	const [items, setItems] = useState<PostType[]>([]);
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		if (!filter) {
			return setItems(posts);
		}
		const filtered = posts.filter(post => post.tags.includes(filter));
		return setItems(filtered);
	}, [filter]);
	return (
		<div>
			<section className='m-4 p-4 border-2 border-dotted '>
				<h1 className='tracking-tighter my-1 text-light-gray text-md'>
					CATEGORIES
				</h1>
				<ul className='flex gap-2'>
					<TagButton
						key='all'
						name='all'
						onClick={() => setFilter('')}
						backgroundColor='#686473'
					/>
					{tags.map((tag, index) => (
						<TagButton
							key={index}
							name={tag.name}
							backgroundColor={tag.color}
							onClick={() => setFilter(tag.name)}
						/>
					))}
				</ul>
			</section>
			<section>
				<h1 className='text-center text-light-gray -skew-y-1 text-3xl p-4 tracking-tight'>
					All Articles
				</h1>
				<ul className='layout'>
					{items.map((post, index) => {
						return (
							<li
								className={'hover:underline py-4 border-b hover:text-blue-500'}
								key={index}
							>
								<Link className='space-y-1' href={`./posts/${post.slug}`}>
									<h2 className='text-2xl font-hahmlet'>{post.title}</h2>
									<div className='flex items-center gap-2'>
										<time className='font-hahmlet tracking-tighter text-md font-semibold'>
											{new Date(post.date).toLocaleString('ko', {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
											})}
										</time>
										<ul className='flex gap-1 text-xs'>
											{tags
												.filter(tag => post.tags.includes(tag.name))
												.map(tag => (
													<li
														style={{ backgroundColor: tag.color }}
														className='inline-block p-1 rounded-sm font-rubik'
														key={index}
													>
														<span className='opacity-70'>{tag.name}</span>
													</li>
												))}
										</ul>
									</div>
									<p className='line-clamp-3 font-medium'>{post.description}</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	);
}

export default PageFilter;
