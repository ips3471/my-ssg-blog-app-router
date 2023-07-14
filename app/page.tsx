import { PostPresenter } from './_api/api';
import HomePage from './home-page';

async function getPosts() {
	const presenter = new PostPresenter();
	const allPosts = presenter.getAllPosts([
		'title',
		'date',
		'description',
		'slug',
	]);
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
