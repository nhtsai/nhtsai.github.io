import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Nathan",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "Nathan",
	// Meta property used as the default description meta property
	description: "Data scientist and developer",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "en-US",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_US",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-US",
		options: {
			day: "2-digit",
			month: "short",
			year: "numeric",
		},
	},
	webmentions: {
		link: "",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Posts",
		path: "/posts/",
	},
	// {
	// 	title: "Projects",
	// 	path: "/projects/",
	// },
];
