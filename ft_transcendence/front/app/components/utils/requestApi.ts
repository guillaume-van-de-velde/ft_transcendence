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
            console.log("token refused - reload");
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
        if (error.message) {
            
            const span = document.createElement("span");
            span.className = "absolute left-1/2 top-10 -translate-x-1/2 bg-red-600 text-white font-dangrek text-xl rounded-full h-[60px] w-[250px] flex items-center justify-center text-center";
            span.textContent = error.message;
            const body = document.querySelector("body");
            document.querySelector("body")!.appendChild(span);
            setTimeout(() => span.remove(), 2000);
        }
        return null;
    }
}
