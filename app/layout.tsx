import { Metadata } from 'next';
import { title, description } from './_lib/constants';
import './_styles/global.css';
import Link from 'next/link';

export const metadata: Metadata = {
	title,
	description,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ko'>
			<body>
				<nav>
					<Link href={'/'}>
						<h1>Logo</h1>
					</Link>
					<Link href={'/posts'}>Articles</Link>
				</nav>
				{children}
			</body>
		</html>
	);
}
