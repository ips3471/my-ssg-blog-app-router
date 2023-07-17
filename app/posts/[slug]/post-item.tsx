'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/app/__components/markdown-styles.module.css';
import Image from 'next/image';

type Props = {
	content: string;
};

export default function PostItem({ content }: Props) {
	return (
		<ReactMarkdown
			components={{
				img: props => (
					<Image
						src={props.src!}
						alt={props.alt || ''}
						width={1200}
						height={600}
					/>
				),
			}}
			className={styles.markdown}
			remarkPlugins={[remarkGfm]}
		>
			{content}
		</ReactMarkdown>
	);
}
