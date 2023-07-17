'use client';

import markdownStyles from '@/app/__components/markdown-styles.module.css';

type Props = {
	content: string;
};

export default function PostItem({ content }: Props) {
	return (
		<div
			id='show-markdown'
			className={markdownStyles['markdown']}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
