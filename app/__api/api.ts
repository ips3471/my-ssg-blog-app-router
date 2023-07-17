import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import PostType from '../__interfaces/post';
import randomColor from 'randomcolor';

export type Item = {
	[key in Field]?: string;
};

type Field = keyof PostType;
const postsDir = 'app/__posts';
const dataFields: Field[] = [
	'content',
	'date',
	'description',
	'slug',
	'tags',
	'title',
];

function fileToItem(fileOrSlug: string) {
	const slug =
		fileOrSlug.slice(-3) === '.md' ? fileOrSlug.replace('.md', '') : fileOrSlug;

	const path = join(postsDir, `${slug}.md`);
	const parsed = fs.readFileSync(path, 'utf-8');
	const { content, data } = matter(parsed);

	const item: PostType = {
		content: '',
		date: '',
		description: '',
		slug: '',
		tags: [],
		title: '',
	};

	dataFields.forEach(async field => {
		if (typeof data[field] !== 'undefined') {
			item[field] = data[field];
		}
		if (field === 'slug') {
			item.slug = slug;
		}
		if (field === 'content') {
			item.content = content;
		}
	});

	return item;
}

export async function getAllPosts() {
	const files = fs.readdirSync(postsDir);
	const posts = files
		.map(fileToItem)
		.sort((prev, next) => (prev.date! > next.date! ? -1 : 1));
	return posts;
}

export async function getPostBySlug(slug: string) {
	return fileToItem(slug);
}

export async function getAllTags() {
	const allPosts = await getAllPosts();
	const tags = allPosts.reduce((acc: string[], curr) => {
		return acc.concat(curr.tags);
	}, []);
	const uniqueTags = Array.from(new Set(tags));
	const tagsWithColor = uniqueTags.map(tag => ({
		name: tag,
		color: randomColor({
			luminosity: 'light',
		}),
	}));
	return tagsWithColor;
}
