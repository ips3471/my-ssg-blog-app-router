import { getAllPosts, getAllTags } from '../__api/api';
import PageFilter from './page-filter';

async function getPosts() {
	return await getAllPosts();
}

async function getTags() {
	return await getAllTags();
}

async function Posts() {
	const allPosts = await getPosts();
	const tags = await getTags();

	return <PageFilter posts={allPosts} tags={tags} />;
}

export default Posts;
