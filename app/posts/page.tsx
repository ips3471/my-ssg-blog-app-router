import Link from 'next/link';
import { getAllPosts } from '../__api/api';
import randomColor from 'randomcolor';
import PageFilter from './page-filter';

interface Props {}

async function getPosts() {
	return await getAllPosts();
}

async function Posts({}: Props) {
	const allPosts = await getPosts();
	const tags = allPosts.reduce((acc: string[], curr) => {
		return acc.concat(curr.tags);
	}, []);
	const uniqueTags = Array.from(new Set(tags));
	const tagsWithColor = uniqueTags.map(tag => ({
		name: tag,
		color: randomColor({
			luminosity: 'light',
		}),
	}));
	return <PageFilter posts={allPosts} tags={tagsWithColor} />;
}

export default Posts;
