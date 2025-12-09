import { removeToken, token } from "../../index.js";

export async function requestAPI(url: string, requestConfig: RequestInit): Promise<any> {
    try {
        if (token) {
            requestConfig.headers = {
                ...(requestConfig.headers),
                "Authorization": `Bearer ${token}`
            };
        }
        const response = await fetch(url, requestConfig);
        if (response.status == 401 && await response.text() == "token refused") {
            console.log("token refused - rechargement de la page");
            removeToken();
            window.location.reload();
            return;
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data.error || `error ${response.status}`);
        }
        const data = await response.json().catch(() => null);
        return data;
    } catch (error: any) {
        console.log(error);

        if (error) {
            const span = document.createElement("span");
            span.classList = "absolute left-1/2 top-10 -translate-x-1/2 bg-red-600 text-white font-dangrek text-md rounded-full h-[60px] w-[250px]";
            span.textContent = error;
            document.querySelector(".root")?.appendChild(span);
            setTimeout(() => span.remove(), 2000);
        }
    }
}
