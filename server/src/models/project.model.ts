import { sendQuery } from "../Pool";

class ModelProject {
    async getAll() {
        console.log('model')
        return await sendQuery("SELECT * FROM projects")
    }
    async getAllSearch(search: string) {
        return await sendQuery("SELECT * FROM projects p WHERE p.name LIKE '%' ||  $1 || '%'", [search])
    }
    async getOne(id: number) {
        return await sendQuery(`select * from projects
            where id = $1`,
            [id])
    }
}

export default new ModelProject();