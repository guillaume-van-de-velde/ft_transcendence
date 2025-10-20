export function stringToHTMLElement(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html;
    const element = template.content.firstElementChild;
    return element as Element;
}