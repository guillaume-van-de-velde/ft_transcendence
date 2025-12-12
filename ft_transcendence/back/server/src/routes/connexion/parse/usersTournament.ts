import { readUser } from "../../../db/crud/read";
import { KeyUser, UserInTournament, UserShortData } from "../../../utils/enums";

export async function parseUsersTournament(Tournament: any): Promise<UserInTournament[]> {

    const UsersTournament: UserInTournament[] = [];

    for (let i = 1; i <= 8; i++) {
        const idKey = `id${i}`;
        const lvKey = `lv${i}`;
        const id = Tournament[idKey];
        const lv = Tournament[lvKey];
        if (!id)
            continue;
        let userData:UserShortData | null;
        try {
            userData = await readUser(id, KeyUser.ID, true);
        } catch (err) {
            userData = null;
        }
        if (userData) {
            UsersTournament.push(
                {
                    user: userData,
                    level: lv,
                    queue: false,
                    finish: false,
                    quit: false
                }
            )
        }
    }

    return UsersTournament;
}