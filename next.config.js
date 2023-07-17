/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nextjs.org',
				pathname: '/**/*',
			},
		],
	},
};

module.exports = nextConfig;
