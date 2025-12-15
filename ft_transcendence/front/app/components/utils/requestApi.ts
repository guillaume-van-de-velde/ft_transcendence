import { removeToken, token } from "../../index.js";

function isXSSPayload(obj: any): boolean {
    if (!obj) return false;

    const patterns = [
        /<script/i,
        /<\/script/i,
        /javascript:/i,
        /on\w+=/i,
        /<iframe/i,
        /<img/i,
        /<svg/i
    ];

    const json = JSON.stringify(obj);

    return patterns.some((regex) => regex.test(json));
}

export async function requestAPI(url: string, requestConfig: RequestInit): Promise<any> {
    try {
        if (token) {
            requestConfig.headers = {
                ...(requestConfig.headers),
                "Authorization": `Bearer ${token}`
            };
        }
        const response = await fetch(url, requestConfig);
        const data = await response.json().catch(() => null);
        if (isXSSPayload(data)) {
            throw new Error("Suspicious response (XSS)");
        }
        if (!response.ok) {
            if (data.error == "token refused") {
                console.log("token refused - reload");
                removeToken();
                window.location.reload();
                return;
            }
            throw new Error(data.error || `error ${response.status}`);
        }
        return data;
    } catch (error: any) {
        if (error.message) {

            const span = document.createElement("span");
            span.className = "absolute left-1/2 top-10 -translate-x-1/2 bg-red-600 text-white font-dangrek text-xl rounded-full h-[60px] w-[250px] flex items-center justify-center text-center";
            span.textContent = span.textContent = error.message.length > 20 ? error.message.substring(0, 20) + "..." : error.message;
            document.querySelector("body")!.appendChild(span);
            setTimeout(() => span.remove(), 2000);
        }
        return null;
    }
}
