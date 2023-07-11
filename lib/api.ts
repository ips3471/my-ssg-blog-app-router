import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

type Item = { [key: string]: string };

export class PostPresenter {
	readonly rootDir: string;
	readonly files: string[];
	constructor(folderPath: string = '__posts') {
		this.rootDir = join(process.cwd(), folderPath);
		this.files = fs.readdirSync(this.rootDir);
	}

	private getPostWithField(filename: string, fields: string[]) {
		console.log(filename, fields);

		const filePath = join(this.rootDir, filename);
		const file = fs.readFileSync(filePath, 'utf-8');
		const { content, data } = matter(file);

		const item: Item = {};

		fields.forEach(field => {
			if (typeof data[field] !== 'undefined') {
				item[field] = data[field];
			}
			if (field === 'slug') {
				item.slug = filename.replace('.md', '');
			}
			if (field === 'content') {
				item.content = content;
			}
		});
		return item;
	}

	getPostBySlug(fields: string[], slug: string) {
		const filename = slug + '.md';

		const post = this.getPostWithField(filename, fields);
		return post;
	}

	getAllPosts(fields: string[] = []) {
		const posts = this.files
			.map(filename => this.getPostWithField(filename, fields))
			.sort((prev, next) => (prev.date > next.date ? -1 : 1));
		return posts;
	}
}
