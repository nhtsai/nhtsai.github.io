import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * Return function to calculate post reading time.
 * 
 * @returns function to calculate post reading time
 */
export function remarkReadingTime() {
	// @ts-expect-error:next-line
	return function (tree, { data }) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}
