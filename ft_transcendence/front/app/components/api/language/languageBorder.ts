import { languageAddBorder } from "./languageAddBorder.js";
import { languageRemoveBorder } from "./languageRemoveBorder.js";

export function languageBorder(e: Event) {
    const selected = document.querySelector(".selected")!.id;
    if ((e.target! as HTMLElement).id == selected)
        return;
    const oldLanguage = selected;
    languageAddBorder((e.target! as HTMLElement).id);
    languageRemoveBorder(oldLanguage);
}