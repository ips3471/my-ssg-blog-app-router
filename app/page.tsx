import presenter from './_api/api';
import HomePage from './home-page';

async function getPosts() {
	const allPosts = presenter.getAllPosts();
	return allPosts;
}

export default async function Page() {
	const allPosts = await getPosts();

	return (
		<div className='layout'>
			<HomePage posts={allPosts} />;
		</div>
	);
}
