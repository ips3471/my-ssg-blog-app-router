import { getAllPosts, getAllTags } from './__api/api';
import ListPreview from './__components/list-preview';
import TagType from './__interfaces/tag';

async function getPosts() {
	return await getAllPosts();
}

async function getTags(): Promise<TagType[]> {
	return await getAllTags();
}

export default async function Page() {
	const allPosts = await getPosts();
	const allTags = await getTags();

	return (
		<ul className='layout'>
			{allPosts.map((post, index) => (
				<ListPreview key={index} post={post} tags={allTags} />
			))}
		</ul>
	);
}
