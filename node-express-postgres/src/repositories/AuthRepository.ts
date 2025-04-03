import { Auth } from '@interfaces/IAuth';
import { AuthDtoConversionUtlity } from '@utility/AuthDtoConversionUtility';
import { Knex } from 'knex';
import { db } from 'knexfile';

export class AuthRepository {
    private tableName = 'auth';
    private db: Knex;

    constructor() {
        this.db = db;
    }

    async saveUserCredentials(
        userId: string,
        hashedPassword: string
    ): Promise<void> {
        await this.db(this.tableName).insert({
            user_id: userId,
            password: hashedPassword,
        });
    }

    async getUserCredentials(userId: string): Promise<string> {
        const userCredentials = await this.db(this.tableName)
            .where({ user_id: userId })
            .first();

        return userCredentials.password;
    }

    async deleteUserCredentials(
        userId: string,
        trx?: Knex.Transaction
    ): Promise<Auth> {
        const auth = await (trx || this.db)(this.tableName)
            .where({ user_id: userId })
            .del()
            .returning('id');

        const deletedUserDetails: Auth = auth[0] || null;
        return AuthDtoConversionUtlity.convertAuth(deletedUserDetails);
    }
}
