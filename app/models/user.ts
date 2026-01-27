import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import DataConnection from './data_connection.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare rememberMeToken: string | null

  @column()
  declare userName: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare avatarUrl: string

  @column()
  declare oauthToken: string

  @column()
  declare emailVerified: boolean

  @hasMany(() => DataConnection)
  declare dataConnections: HasMany<typeof DataConnection>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }
}
