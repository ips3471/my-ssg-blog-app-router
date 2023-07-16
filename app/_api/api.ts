import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import PostType from '../_interfaces/post';
import markdownToHtml from '@/app/_lib/markdownToHtml';

export type Item = {
	[key in Field]?: string;
};
type Field = keyof PostType;

class PostPresenter {
	readonly rootDir: string;
	readonly files: string[];
	fields: Field[];
	constructor(folderPath: string = 'app/__posts') {
		this.rootDir = join(process.cwd(), folderPath);
		this.files = fs.readdirSync(this.rootDir);
		this.fields = ['title', 'date', 'description', 'slug', 'content', 'tags'];
	}

	private getPostWithField(filename: string) {
		const filePath = join(this.rootDir, filename);
		const file = fs.readFileSync(filePath, 'utf-8');

		const { content, data } = matter(file);

		const item: Item = {};

		this.fields.forEach(async field => {
			const html = await markdownToHtml(content || '');
			if (field === 'slug') {
				item.slug = filename.replace('.md', '');
			} else if (field === 'content') {
				item.content = html;
			} else {
				item[field] = data[field];
			}
		});
		return item;
	}

	getPostBySlug(slug: string) {
		const filename = slug + '.md';
		const post = this.getPostWithField(filename);
		return post;
	}

	getAllPosts() {
		const posts = this.files
			.map(filename => this.getPostWithField(filename))
			.sort((prev, next) => (prev.date! > next.date! ? -1 : 1));
		return posts;
	}
}

export default new PostPresenter();
