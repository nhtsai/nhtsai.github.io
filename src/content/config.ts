import { z, defineCollection } from "astro:content";

/**
 * Convert to lowercase and remove all duplicate items.
 * 
 * @param array - array of tags
 * @returns array of lowercase and distinct tags
 */
function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

// Define type and schema for "post" collection
const post = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(30).max(160),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string(),
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional(),
		}),
});

export const collections = { post };
