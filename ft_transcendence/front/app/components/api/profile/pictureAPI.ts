export function pictureAPI(element: HTMLElement | null, classOptions: string, src: string) {
    const img = document.createElement("img");
    img.className = classOptions;
    img.src = src;
    element?.replaceChildren(img);
}