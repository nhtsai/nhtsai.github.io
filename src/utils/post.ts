import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

/**
 * Get all posts from content collection.
 * 
 * Note: this function filters out draft posts based on the environment
 * 
 * @returns list of posts
 */
export async function getAllPosts() {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

/**
 * Sort markdown posts by date.
 * 
 * Uses publish date if updated date not available.
 * 
 * @param posts - list of posts
 * @returns sorted list of posts
 */
export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
		return bDate - aDate;
	});
}

/**
 * Get all tags from a list of posts.
 * 
 * Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 * 
 * @param posts - list of posts
 * @returns list of tags
 */
export function getAllTags(posts: Array<CollectionEntry<"post">>) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/**
 * Get all unique tags from a list of posts.
 * 
 * Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 * 
 * @param posts - list of posts
 * @returns list of unique tags
 */
export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
	return [...new Set(getAllTags(posts))];
}

/**
 * Get a sorted list of unique tags and counts
 * 
 * Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 * 
 * @param posts - list of posts
 * @returns sorted list of unique tags and counts
 */
export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
