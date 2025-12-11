export function languageRemoveBorder(language: string) {
    const element = document.getElementById(language);

    element?.classList.remove("border-4", "border-black", "selected");
}