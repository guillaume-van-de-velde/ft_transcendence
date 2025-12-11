export async function connexionAPI(url: string, requestConfig: RequestInit): Promise<any> {
    try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erreur lors de la requete: ", error)
    }
}