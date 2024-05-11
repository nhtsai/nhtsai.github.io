/**
 * Toggle a class of an element.
 * 
 * @param element - target element
 * @param className - target class name
 */
export function toggleClass(element: HTMLElement, className: string) {
	element.classList.toggle(className);
}

/**
 * Determine if element has a class.
 * 
 * @param element - target element
 * @param className - target class name
 * @returns whether target element has target class
 */
export function elementHasClass(element: HTMLElement, className: string): boolean {
	return element.classList.contains(className);
}

/**
 * Determine if root node of document has dark class.
 * 
 * @returns whether root node has dark class
 */
export function rootHasDarkClass() {
	return elementHasClass(document.documentElement, "dark");
}
