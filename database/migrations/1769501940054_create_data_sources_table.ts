import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'data_connections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('provider')
      table.string('access_token')
      table.string('refresh_token').nullable()
      table.timestamp('token_expires_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
