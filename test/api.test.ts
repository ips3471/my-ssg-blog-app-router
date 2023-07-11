import { PostPresenter } from '../lib/api';

describe('post presenter', () => {
	let presenter: PostPresenter;

	beforeEach(() => {
		presenter = new PostPresenter('test/test-posts');
	});

	it('presents all posts without content', () => {
		const posts = presenter.getAllPosts(['title', 'slug']);
		expect(posts).toEqual([
			{ title: 'test1', slug: 'test1' },
			{ title: 'test2', slug: 'test2' },
		]);
	});

	it('presents a post by slug', () => {
		const post = presenter.getPostBySlug(['title', 'content'], 'test1');
		const { title, content } = post;
		expect(title).toBe('test1');
		expect(content.trim()).toBe('this is a test1 body');
	});
});
