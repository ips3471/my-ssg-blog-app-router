---
date: '2023-07-13'
description: Next.js의 App Router를 기존 프로젝트에 적용하는 작업을 소개합니다.
tags:
  - app-router
  - server-component
  - client-component
  - data-fetching
title: pages에서 App Router로 마이그레이션 하기
---

# Migrating from pages to app

[Next.js 공식문서](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#upgrading-new-features)를 참고하여 **_Pages Router_**를 **_App Router_** 방식으로 변환하는 과정을 기록해보았다.

## Step 1: Creating the app directory

#### 힌트✨

- Next.js 버전이 13.4 이상이라면 프로젝트 최상단에 `app` 폴더를 생성한다.

한편 폴더를 생성하면서 프로젝트의 폴더 구조를 고민하게 되었다.

> 프로젝트 파일을 어디에 둘 것인가?

공식문서에서는 다음 세가지 옵션으로 일반화하고 있다.

| Feature                            | Description                                                                                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. `App` 외부에 두는 방법          | ![Store project files outside of app](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-project-root.png&w=1920&q=75&dpl=dpl_4w5XmDcbLe4C4AG5VJAoeG8dxqAU)                 |
| 2. `App root` 내부에 두는 방법     | ![Store project files in top-level folders inside of app](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-app-root.png&w=1920&q=75&dpl=dpl_4w5XmDcbLe4C4AG5VJAoeG8dxqAU) |
| 3. 기능, 경로에 따라 구분하는 방법 | ![Split project files by feature or route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-app-root-split.png&w=1920&q=75&dpl)                                           |

1번은 `App directory`를 순수하게 `route`목적으로 사용하는 방법이다. 이전 버전의 `pages`와 유사한 기능을 수행한다. 하지만 **_App Router_**는 [Nested Routes](https://nextjs.org/docs/app/building-your-application/routing#nested-routes) 구조를 사용하는데, 다양한 `route`를 하나의 디렉토리로 분리하여 관리하는 것에 어떤 이점이 있을까 하는 의문을 가지게 되었다.

2번은 **_App Router_** 기반에서 가장 직관적인 폴더 구조라고 생각했다. 이전 버전에서는 `pages` 내부에 폴더를 생선하는 것 자체만으로 pulbic route 조건을 만족했는데, **_App Router_** 버전에서는 생성된 폴더 내부에 `page.js`를 배치하여야 `route`기능을 할 수 있다. 따라서 `app` 내부에 여러 폴더를 두더라도 [Safely Colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation#safe-colocation-by-default)을 통한 `route`가 가능하다.

3번은 재사용성을 염두한 큰 규모의 프로젝트에서 이점을 얻을 수 있다.

> 그렇다면 블로그처럼 정적이면서 반복적인 작업을 수행하는 프로젝트에서는 어떤 방식이 적합할 것인가?

1번은 **Nested Routes**를 구현하는 **_App Router_**의 정체성과 배치되는 것 같았고, 3번은 프로젝트의 규모에 맞지 않게 복잡한 폴더 구조를 가지게 될 것 같았다. 결과적으로 이번 프로젝트에서는 2번과 같이 프로젝트 코드를 `app` 내부에 두는 방법을 사용하기로 했다.

> [Private folders](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders), 사용할 것인가?

**_App Router_**의 **Safely Colocation** 특성 때문에 꼭 `route`로직을 UI와 분리할 필요는 없지만 `app`폴더가 비대해질 수 있는 문제점과 가독성을 고려해서 적용하기로 했다.

## Step 2: Creating a Root Layout

#### 힌트✨

- `app` 폴더에는 반드시 `Root Layout`이 있어야 한다.
- `Root Layout`은 모든 하위 페이지에 걸쳐 공유되며 `html`과 `body` 태그와 `children`이 포함되어야 한다.
- `Root Layout`은 [Server Component](https://nextjs.org/docs/getting-started/react-essentials)로만 렌더링되며, [Client Component](https://nextjs.org/docs/getting-started/react-essentials#client-components)로 사용될 수 없다.

> `app/layout.js`은 이전 버전의 `index.js`를 대체?

**Nesting Layouts** 구조에서 상위 레이아웃은 하위 레이아웃을 감싸게 된다. 따라서 **Root Layout**에 `Navigation`을 배치하면 모든 하위 `route`에서 접근할 수 있다.

```ts
// app/layout.tsx

<html>
	<body>
		<NavigationBar />
		{children}
	</body>
</html>
```

## Step 3: Migrating next/head

#### 힌트✨

- **_App Router_**에서는 [built-in SEO support](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)를 이용해 생성한 `metadata` 객체가 `<head>`요소를 대체한다.

```ts
// app/layout.tsx;

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = params.slug;
	const post = presenter.getPostBySlug(['title', 'description'], slug);

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function Page({ params }: Props) {
	return;
}
```

기존 방식이라면 `app/page.tsx` 안에 `<head>`를 삽입하여야 했었는데 이제는 `metadata`를 UI와 분리하여 처리할 수 있게 되었다. `route`에 대응하는 데이터에 따라 동적으로 `metadata`를 생성하기 위해 반복적으로 `fetch`가 발생하는데, 이 부분은 Next.js에서 캐싱하여 최적화한다.

## Step 4: Migrating Pages

#### 힌트✨

**_Pages Router_**의 `pages`를 **_App Router_** 구조로 옮기기 위해서는 다음의 두 단계를 거치는 것이 권장된다.

1. 데이터를 prop으로 받아 화면에 그리는 **Client Component**를 생성하고
2. **Data Fetching**을 수행한 다음 그 데이터를 **Client Component**에 전달하는 `page.js`라는 **Server Component**를 생성하는 것이다.

> **Data Fetching**의 진행과 결과에 따라 **Client Component**에서 `loading.js` `error.js` 등으로 사용자와 상호작용할 수 있겠구나!

```ts
// app/posts/[slug]/post-item.tsx

'use client';
type Props = {
	content: string;
};

export default function PostItem({ content }: Props) {
	return <div dangerouslySetInnerHTML={{ __html: content || '' }} />;
}
```

단순히 데이터를 받아 렌더링하는 Client Component를 생성하고,

```ts
// app/posts/[slug]/page.tsx

import { PostPresenter } from '@/app/_api/api';
import PostItem from './post-item';
import markdownToHtml from '@/app/_lib/markdownToHtml';

type Props = {
	params: {
		slug: string;
	};
};

const presenter = new PostPresenter();

async function getPost(slug: string) {
	const post = presenter.getPostBySlug(
		['title', 'date', 'content', 'description'],
		slug,
	);
	const content = await markdownToHtml(post.content || '');

	return { ...post, content };
}

export default async function Page({ params }: Props) {
	const { slug } = params;
	const post = await getPost(slug);

	return (
			<PostItem content={post.content} />;
	);
}
```

`fetch` 로직을 수행하는 Server Component를 생성한다. 비동기적으로 실행되는 `fetch`의 결과가 테스크큐를 거쳐 콜스택에서 반환되면 그 데이터를 Client Component로 전달한다.

## Step 5: Migrating Routing Hooks

#### 힌트✨

- **_App Router_**에서는 더이상 `next/router hooks`을 사용할 수 없다.
- **_App Router_**에서 `useRouter hooks`은 `next/router`가 아닌 `next/navigation`으로부터 `import`한다.
- ~~`router.pathname`~~ 대신 `usePathname()`
- ~~`router.query`~~ 대신 `useSearchParams()`
- `usePathname`, `useSearchParams`는 Client Componen에서 동작하며 페이지의 변경을 감지한다.

단순히 정적인 페이지를 노출시키는 블로그 프로젝트 특성상 **Routing Hooks**에 대한 별다른 마이그레이션 작업은 필요하지 않았다.

## Step 6: Migrating Data Fetching Methods

#### 힌트✨

- 데이터를 서버로부터 가져오기 위한 **_Pages Router_**의 `getServerSideProps`와 `getStaticProps`는 별도의 Server Component에서 `fetch`를 수행하는 것으로 변경되었다.
- HTTP Request 정보를 가져오는 `getServerSideProps`의 `req`는 Server Component에서 `heades()` 또는 `cookies()`를 호출하여 가져올 수 있다.
- `build` 시점에서 페이지를 미리 렌더링하는 `getStaticProps`는 Server Component에서 `fetch` 결과를 `caching`하는 것으로 대체되었다.
- `fetch`된 데이터는 기본값으로 캐싱(`cache: 'force-cache'`)되며 `cache: 'no-store'`옵션을 통해 항상 최신 데이터를 유지하도록 할 수 있다.
- `build` 시점에서 동적으로 렌더링 경로를 정의하는 `getStaticPaths`는 `generateStaticParams`로 대체되었다.

- `build` 시점에 미리 렌더링되지 않은 페이지의 동작을 구성하는 `fallback` 처리 방법이 바뀌었다.
  1.  `getStaticPath`의 `path`는 `generateStaticParams`의 `return`값으로 바뀌었고
  2.  `getStaticPath`의 `fallback`옵션은 `dynamicParams`의 값으로 변경되었다.
  3.  기존 `fallback` 옵션 중 `blocking`은 `dynamicParams`의 `true`값으로 대체되면서 더이상 사용되지 않는다.

~~하지만 이 단계에서 해야할 조치들은 이미 Step 4에서 모두 한 것 같다...~~

### Incremental Static Regeneration(ISR)?

**_Pages Router_**에서는 ISR을 구현하기 위해 `getStaticProps`의 `revalidate`값을 설정하여 주기적으로 페이지를 재생성하도록 했다. 이와 달리 **_App Router_**에서는 `fetch` 옵션의 `next.revalidate`값으로 페이지 업데이트 주기를 결정한다.

딱히 현재 프로젝트에서는 굳이 ISR의 필요성을 느끼지 못했기 때문에 문서만 확인하고 넘어간다.

## Step 7: Styling

#### 힌트✨

- **Tailwind CSS**를 사용하는 경우, `tailwind.config.js`의 `content` 배열에 `app` 경로를 포함해야 `style`이 적용된다.
- `Pages Router`의 `index.js`에 있던 `css` 경로를 `Root Layout`으로 옮겨야 한다.
