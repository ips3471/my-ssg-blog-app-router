'use client';
import markdownStyles from '@/app/_components/markdown-styles.module.css';

type Props = {
	content: string;
};

export default function PostItem({ content }: Props) {
	return (
		<div
			className={markdownStyles['markdown']}
			dangerouslySetInnerHTML={{ __html: content || '' }}
		/>
	);
}