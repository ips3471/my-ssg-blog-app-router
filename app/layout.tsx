import { Metadata } from 'next';
import { title, description } from './_lib/constants';
import './_styles/global.css';
import Link from 'next/link';
import { Rubik_Mono_One } from 'next/font/google';
import localFont from 'next/font/local';

export const metadata: Metadata = {
	title,
	description,
};

export const hahmlet = localFont({
	variable: '--font-hahmlet',
	src: './_styles/fonts/Hahmlet-VariableFont_wght.ttf',
	display: 'swap',
});

export const rubik = Rubik_Mono_One({
	variable: '--font-rubik',
	weight: '400',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ko' className={`${rubik.variable} ${hahmlet.variable}`}>
			<body>
				<nav className='flex text-light-gray items-center justify-between p-4 border-b'>
					<Link href={'/'}>
						<h1 className='rounded-full -rotate-3 overflow-hidden'>
							<img src='/imgs/logo.png' width={50} alt='logo' />
						</h1>
					</Link>
					<Link href={'/posts'}>Articles</Link>
				</nav>
				{children}
			</body>
		</html>
	);
}
