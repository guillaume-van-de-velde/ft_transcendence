import { link } from "../../../index.js";
import { renderVerifyDelete } from "../../pages/settings/account/verifyDelete.js";
import { requestAPI } from "../../utils/requestApi.js";

export async function deleteAccountCallAPI() {
    requestAPI(`${link}/api/settings/delete`, {
        method: "DELETE"
    });
    renderVerifyDelete();
}