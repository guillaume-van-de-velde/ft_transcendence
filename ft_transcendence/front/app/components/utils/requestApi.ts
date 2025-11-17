export async function requestAPI(url:string, requestConfig:RequestInit):Promise<any> {
    try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json().catch(() => null);
        return data;
    } catch (error) {
        console.error("Erreur lors de la requete: ", error)
    }
}
