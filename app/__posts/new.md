---
date: '2023-07-17'
description: Markdown의 <img>를 `next/image`로 대체하는 과정을 설명합니다.
tags:
  - Next
title: Markdown <img>를 Next Image로 갈아끼우기
---

**_Next.js_**에서 제공하는 `<Image>`는 다음과 같은 기능을 제공한다

- **Size Optimization**: WebP 및 AVIF와 같은 최신 이미지 형식을 사용하여 각 디바이스에 적합한 크기의 이미지를 자동으로 제공
- **Visual Stability**: 이미지가 로딩되는 동안 layout shift를 방지
- **Faster Page Loads**: 기본 브라우저의 지연 로딩을 이용하여 이미지가 뷰포트 내에 들어올 때 로드
- **Asset Flexibility**: Remote Images에 대해서도 리사이징 제공

하지만 markdown에서 파싱한 html 데이터는 이미지를 이미 `<img>` 태그로 감싸고 있다. 그래서 어떻게 하면 markdown 이미지에 `next/image` 모듈을 적용할 수 있을지 알아보았다.

여러가지 방법이 있을 수 있지만 다음과 같은 두가지 방법을 알게되었다.

- MDX[^1]와 함께 markdown 내부에서 `next/image`를 사용하기
- [react-markdown 라이브러리](https://github.com/remarkjs/react-markdown)를 이용해서 `<img>`를 `next/image`로 갈아끼우기

### Using MDX

마크다운에서 `next/image`를 사용하는 가장 쉬운 방법은 **_MDX_**를 이용하는 것이다. MDX를 활용하면 markdown 내부에서도 jsx문법을 사용할 수 있다. 다시 말하면 markdown과 리액트 컴포넌트를 함께 사용할 수 있다.

### Using react-markdown

**_React-Markdown_**을 활용하면 Markdown이 플러그인에 의해 HTML 요소로 파싱되는데, 이때 HTML 요소를 대신할 컴포넌트를 직접 전달할수도 있다. 따라서 Markdown과 함께 HTML의 `<img>` 요소를 갈아끼울 React 컴포넌트를 `prop`으로 전달하여 결국은 `next/image`가 적용되도록 할 수 있다.

> 어떤 방식을 선택할 것인가?

한편 이 블로그에서는 처음부터 [remark-html](https://github.com/remarkjs/remark-html)을 사용하고 있었기 때문에 추가적인 패키지 없이 `<img>` 수정이 가능한가 싶었는데, 마땅한 방법이 없어서 기존 remark-html을 react-markdown으로 바꾸기로 했다.

### Substituting the Image Element

**_React Markdown_**에서는 HTML 요소에 적용할 React 컴포넌트를 Prop으로 전달할 수 있다.

```ts
import Image from '`next/image`';
// ...
return (
	// ...
	<ReactMarkdown
		components={{
			img: props => (
				<Image src={props.src} alt={props.alt} width={1200} height={200} />
			),
		}}
	>
		{content}
	</ReactMarkdown>
	// ...
);
```

✔️ `<img>`를 `next/image`로 갈아끼우기 위해서는 이미지 크기를 반드시 설정해야 한다.

`<Img>`의 속성을 그대로 가져다가 사이즈만 추가로 정의해서 `<Image />`를 만들었고 개발도구를 통해 Image Component가 잘 적용됐음을 확인할 수 있다.

![next-image](/imgs/react-markdown01.png)

- [x] `<img>`를 `next/image`로 대체하기
- [ ] 최적의 이미지 사이즈를 지정하여 Layout Shift 방지하기

[^1]: MDX를 사용하면 마크다운 콘텐츠에 JSX를 사용할 수 있습니다. 대화형 차트나 알림과 같은 컴포넌트를 가져와서 콘텐츠 내에 포함할 수 있습니다. 따라서 컴포넌트가 포함된 긴 형식의 콘텐츠를 쉽게 작성할 수 있습니다.
