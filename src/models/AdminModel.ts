import { Model, Column, Table, DataType } from "sequelize-typescript"
import { IAdmin } from "../types/types"

@Table({ tableName: "admins", timestamps: false })
export default class AdminModel extends Model<IAdmin> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string
}