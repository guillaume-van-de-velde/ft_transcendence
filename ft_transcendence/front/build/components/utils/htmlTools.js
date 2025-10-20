export function stringToHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const element = template.content.firstElementChild;
    return element;
}
