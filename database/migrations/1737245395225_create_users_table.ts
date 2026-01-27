import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 254).nullable().unique()
      table.string('remember_me_token').nullable()
      table.string('first_name')
      table.string('last_name')
      table.string('user_name').unique().nullable()
      table.boolean('email_verified').defaultTo(false)
      table.string('avatar_url')
      table.string('oauth_token')
      table.string('password')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
