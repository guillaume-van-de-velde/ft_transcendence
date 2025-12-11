export function languageAddBorder(language: string) {
    const element = document.getElementById(language);

    element?.classList.add("border-4", "border-black", "selected");
}
