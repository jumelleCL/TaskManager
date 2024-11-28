import { sendQuery } from "../Pool";

class ModelTeam {
    async getAll() {
        return await sendQuery("SELECT * FROM teams t WHERE t.name")
    }
    async getOne(id: number) {
        return await sendQuery(`select * from teams
            where id = $1`,
            [id])
    }
}

export default new ModelTeam();