import Link from 'next/link';
import PostType from '../__interfaces/post';
import TagType from '../__interfaces/tag';
import TagButton from './tag-button';

interface Props {
	post: PostType;
	tags: TagType[];
}

function ListPreview({ post, tags }: Props) {
	const dateToString = (date: string) =>
		new Date(date).toLocaleString('ko', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	return (
		<li className={'hover:underline py-4 border-b hover:text-blue-500'}>
			<Link className='space-y-1' href={`./posts/${post.slug}`}>
				<h2 className='text-2xl font-hahmlet'>{post.title}</h2>
				<div className='flex items-center gap-2'>
					<time className='font-hahmlet tracking-tighter text-md font-semibold'>
						{dateToString(post.date)}
					</time>
					<ul className='flex gap-1 text-xs'>
						{tags
							.filter(tag => post.tags.includes(tag.name))
							.map(tag => (
								<TagButton tag={tag} options={{ padding: 3 }} />
							))}
					</ul>
				</div>
				<p className='line-clamp-3 font-medium'>{post.description}</p>
			</Link>
		</li>
	);
}

export default ListPreview;
