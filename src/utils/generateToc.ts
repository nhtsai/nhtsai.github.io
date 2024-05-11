import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
	subheadings: Array<TocItem>;
}

/**
 * Get list all child subheadings of a table of content item.
 * 
 * Uses DFS approach to recursively traverse N-ary tree of TOCItems
 * 
 * @param item - table of content item
 * @param depth - depth level
 * @returns list of table of content item and all child subheadings
 */
function diveChildren(item: TocItem, depth: number): Array<TocItem> {
	// lowest depth or no existing subheadings
	if (depth === 1 || !item.subheadings.length) {
		console.log("\t\treturning:", item.subheadings);
		return item.subheadings;
	}
	// traverse last child of subheadings array
	var lastItemInSubheadings: TocItem = item.subheadings[item.subheadings.length - 1] as TocItem;
	console.log("\tfinding subh children of", lastItemInSubheadings.slug, "- with gap:", depth - 1);
	return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1);
}

/**
 * Generate table of contents using a post's markdown headings.
 * 
 * Ignore h1 headings. Build trees using h2 as the root node.
 * 
 * @param headings - list of markdown headings
 * @returns list of table of content items
 */
export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
	// ignore h1 elements
	const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
	const toc: Array<TocItem> = [];
	console.log("bodyheadings:", bodyHeadings);

	/*
	If toc is empty: add heading
	for each heading, build tree until reaching a same level depth as root

	2
		4
		4
		4


	3
		4
	3


	4
	4
	4


	current method:
	if h2: add to TOC array
	else:
		if heading is larger: error
		else: add all children by DFS
			add node as child of last item of TOC array

	*/
	// populate the TOC array
	// push h2 to top level
	// then push
	// add h2 to toc
	// recursively add children
	// repeat
	bodyHeadings.forEach((h) => {
		const heading: TocItem = { ...h, subheadings: [] };

		// add h2 elements into the top level
		if (heading.depth === 2) {
			console.log("pushing h2:", h.slug);
			toc.push(heading);
		} else {
			const lastItemInToc = toc[toc.length - 1]!;
			console.log("found h>2:", h.slug);

			// if lower depth (bigger heading), throw error
			if (heading.depth < lastItemInToc.depth) {
				console.log("throwing error");
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}

			// higher depth
			// push into children, or children's children
			const gap = heading.depth - lastItemInToc.depth;
			console.log("\tfinding children of", lastItemInToc.slug, "- with gap:", gap);
			const target: Array<TocItem> = diveChildren(lastItemInToc, gap);
			target.push(heading);
			console.log("\tpushing", heading.slug, "to subheadings of", lastItemInToc.slug, ":\n\t\t", target);
		}
		// console.log(diveChildren(heading, 1));
		// toc.push(heading);
		// console.log("heading:", heading);
		// console.log("toc array:", toc);
	});

	console.log("final:", toc);
	return toc;
}
