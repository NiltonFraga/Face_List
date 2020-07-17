import {MigrationInterface, QueryRunner} from "typeorm";

export class tableUser1594944264000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .query(`
                INSERT INTO "user" 
                VALUES (1, 'admin', 'admin@gmail.com', 'ADMIN', 27, '123456')
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .query(`
                DELETE FROM "user" 
                WHERE id = 1)
            `);
    }

}
