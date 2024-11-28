import { sendQuery } from "../Pool";
import bcrypt from 'bcrypt'

class ModelTeam {
  async getAll() {
    return await sendQuery("SELECT * FROM users")
  }
  async getOne(username: string) {
    return await sendQuery(`select * from users
            where name = $1`,
      [username])
  }
  async createUser(user: string, password: string, email: string, role = "member") {
    try {
      await sendQuery("BEGIN");

      const query = `
            INSERT INTO users (name, password, email, role)
            VALUES ($1, $2, $3, $4) 
            RETURNING id`;
      const pswHash = bcrypt.hashSync(password, 10);

      const values = [user, pswHash, email, role];
      await sendQuery(query, values);
      await sendQuery("COMMIT");

      const result = await sendQuery(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      return result;
    } catch (e) {
      await sendQuery("ROLLBACK");
      console.error(e);
      throw new Error("Error al insertar los datos del usuario");
    }
  }
}

export default new ModelTeam();