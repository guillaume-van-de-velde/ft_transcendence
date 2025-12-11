export function placeholderAPI(idElement: string, dataAPI: string) {
    const element = document.getElementById(idElement) as HTMLInputElement;
    element!.placeholder = dataAPI;
}