import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/error-models";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import { OkPacket } from "mysql";

async function register(user: UserModel): Promise<string> {

    // Validation:
    const error = user.validate();
    if (error) throw new ValidationError(error);

    const usersSql = "SELECT * FROM users";

    const users = await dal.execute(usersSql);

    //email taken:
    if (users.some(u => u.email === user.email)) {
        throw new ValidationError("email already taken");
    }

    user.roleId = RoleModel.user;

    // Hash
    user.password = cyber.hash(user.password);

    // SQL inject:
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const result:OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);
    user.userId = result.insertId;
    const token = cyber.getNewToken(user);
    return token;

}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validation:
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // Hash password:
    credentials.password = cyber.hash(credentials.password);

    // SQL Injection blocked - Prepared statement:
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    if (users.length === 0) throw new UnauthorizedError("Incorrect email or password");
    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;

}
// To get a user by id and get information about him like name in the navbar
async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const users = await dal.execute(sql, [id]);
    if (users.length === 0) throw new ResourceNotFoundError(id);
    const user = users[0];
    return user;
}

export default {
    register,
    login,
    getOneUser
}