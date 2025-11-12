import { readMatches, readUser } from "../../../db/crud/read";
import { KeyUser, MatchHistory } from "../../../utils/enums";

export async function parseHistory(id:number): Promise<MatchHistory[]> {
    const userHistory = await readMatches(id);

    const parsedHistory = Promise.all(
        userHistory.map(async match => {
            let idEnnemy:string;
            let ennemyPointsDB:number;
            let userPointsDB:number;
            if (match.idPlayer1 === id) {
                idEnnemy = match.idPlayer2;
                ennemyPointsDB = match.pointsPlayer2;
                userPointsDB = match.pointsPlayer1;
            } else {
                idEnnemy = match.idPlayer1;
                ennemyPointsDB = match.pointsPlayer1;
                userPointsDB = match.pointsPlayer2;
            }
            return {
                ennemy: await readUser(idEnnemy, KeyUser.ID, true),
                userPoints: userPointsDB,
                ennemyPoints: ennemyPointsDB,
                mode: match.mode,
                date: match.date,
                hour: match.hour
            }
        })
    )

    return parsedHistory;
}