import { Knex } from 'knex';
import { User } from '@interfaces/IUser';
import { db } from 'knexfile';
import { PaginationQueryDto } from '@dtos/PaginationQuery.dto';
import { PaginationQueryBuilder } from '@utility/PaginationQueryBuilder';

export class UserRepository {
    private tableName = 'users';
    private db: Knex;

    constructor() {
        this.db = db;
    }

    async createUser(data: Partial<User>): Promise<User | null> {
        const result = await this.db(this.tableName)
            .insert(data)
            .returning('id');
        const id = result[0]?.id;
        const user = id ? ({ id, ...data } as User) : null;
        return user;
    }

    async exists(condition: object): Promise<boolean> {
        const user = await this.db(this.tableName).where(condition).first();
        return !!user;
    }

    async getAllUsers(paginationOptions: PaginationQueryDto): Promise<User[]> {
        const { page, per_page, order, filter, fields, filter_operator } =
            paginationOptions;
        const paginationQueryBuilder = new PaginationQueryBuilder<User>(
            this.db,
            this.tableName
        )
            .selectFields(fields)
            .applyFilters(filter, filter_operator)
            .applyPagination(page, per_page)
            .applyOrder(order);
        const users = await paginationQueryBuilder.execute();
        return users;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.db(this.tableName).where({ id }).first();
        return user || null;
    }

    async getUserByWhere(condition: object): Promise<User | null> {
        const user = await this.db(this.tableName).where(condition).first();
        return user || null;
    }

    async updateUserWhere(
        condition: object,
        updateData: object
    ): Promise<User | null> {
        const updatedResult = await this.db(this.tableName)
            .where(condition)
            .update(updateData)
            .returning('id');
        const updatedUser = updatedResult[0] || null;
        return updatedUser;
    }

    async deleteUserByWhere(
        condition: object,
        trx?: Knex.Transaction
    ): Promise<User | null> {
        const deletedResult = await (trx || this.db)(this.tableName)
            .where(condition)
            .del()
            .returning('id');
        return deletedResult[0] || null;
    }
}
