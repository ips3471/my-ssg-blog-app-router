'use client';

import { useEffect, useState } from 'react';
import TagType from '../__interfaces/tag';
import PostType from '../__interfaces/post';
import TagButton from '../__components/tag-button';
import ListPreview from '../__components/list-preview';

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
	}, [filter, posts]);

	return (
		<div>
			<section className='m-4 p-4 border-2 border-dotted '>
				<h1 className='tracking-tighter my-1 text-light-gray text-md'>
					CATEGORIES
				</h1>
				<ul className='flex gap-2'>
					<TagButton
						key='all'
						tag={{ name: 'all', color: '#686473' }}
						onClick={() => setFilter('')}
					/>
					{tags.map((tag, index) => (
						<TagButton
							key={index}
							tag={tag}
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
						return <ListPreview key={index} post={post} tags={tags} />;
					})}
				</ul>
			</section>
		</div>
	);
}

export default PageFilter;
