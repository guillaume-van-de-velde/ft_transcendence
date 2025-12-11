import { link } from "../../../index.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function forgotCallAPI(e: Event) {
    e.preventDefault();

    const form = document.getElementById("formLogIn") as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.email) {
        requestAPI(`${link}/api/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email.toString()
            })
        });
    }
}