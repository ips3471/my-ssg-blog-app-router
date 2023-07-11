# 프리온보딩 과제: Static Site Generator 구현 (DEMO)

Next.js 프레임워크를 이용하여 Markdown을 HTML로 변환하여 게재합니다.

## Usage

1. `/__posts` 폴더에 `.md`형식의 포스트를 작성합니다.
   > ```javascript
   > //test.md
   > ---
   > title: 'test'
   > date: '2023-07-11'
   > ---
   > # Markdown 작성
   > **예시**입니다.
   > ```
2. `/index.tsx`에서 `getAllPosts` 메소드로 `.md` 파일을 파싱하여 리턴된 `PostType` 객체를 `getStaticProps`에 전달하여 아이템 목록을 렌더링합니다.
   > ```javascript
   > export const getStaticProps = async () => {
   > 	const presenter = new PostPresenter();
   > 	const allPosts = presenter.getAllPosts([
   > 		'title',
   > 		'date',
   > 		'description',
   > 		'slug',
   > 	]);
   >
   > 	return {
   > 		props: {
   > 			allPosts,
   > 		},
   > 	};
   > };
   > ```
3. 아이템의 상세 페이지를 렌더링할 때는 `getPostBySlug` 메소드를 이용해 각각의 markdown 데이터를 파싱할 수 있습니다.
   > ```javascript
   > export async function getStaticProps({ params }: Params) {
   > 	const presenter = new PostPresenter();
   > 	const fields = ['title', 'date', 'content', 'description'];
   > 	const post = presenter.getPostBySlug(fields, params.slug);
   > 	const htmlString = await markdownToHtml(post.content || '');
   >
   > 	return {
   > 		props: {
   > 			post: {
   > 				slug: params.slug,
   > 				content: htmlString,
   > 			},
   > 		},
   > 	};
   > }
   > ```

## TEST

```javascript
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
```
