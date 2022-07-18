import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRental1658110714167 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'car_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'start_date', type: 'date' },
          { name: 'end_date', type: 'date' },
          { name: 'expected_return_date', type: 'date' },
          { name: 'total', type: 'numeric' },
          { name: 'created_at', type: 'date', default: 'now()' },
          { name: 'updated_at', type: 'date' }
        ],
        foreignKeys: [
          {
            name: 'FKCarRental',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'cascade',
          },
          {
            name: 'FKUserRental',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'cascade',
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rentals', 'FKCarRental');
    await queryRunner.dropForeignKey('rentals', 'FKUserRental');

    await queryRunner.dropTable('rentals');
  }
}
