import { removeToken, token } from "../../index.js";

export async function requestAPI(url:string, requestConfig:RequestInit):Promise<any> {
    try {
        if (token) {
            requestConfig.headers = {
                ...(requestConfig.headers),
                "Authorization": `Bearer ${token}`
            };
        }
        console.log(requestConfig);
        const response = await fetch(url, requestConfig);
        console.log(response);
        
        if (response.status == 401 && await response.text() == "token refused") {
            console.error("token refused - rechargement de la page");
            removeToken();
            window.location.reload();
            return ;
        }
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json().catch(() => null);
        return data;
    } catch (error) {
        console.error("Erreur lors de la requete: ", error);
    }
}
