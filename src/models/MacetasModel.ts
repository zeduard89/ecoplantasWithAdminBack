import { Model, Column, Table, DataType, AutoIncrement, PrimaryKey } from "sequelize-typescript"
import { IMacetas } from "../types/types"
import { INTEGER } from "sequelize"

@Table({ tableName: "macetas", timestamps: true })
export default class MacetasModel extends Model<IMacetas> {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: INTEGER,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: ''
  })
  description!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0
  })
  boca!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0
  })
  base!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0
  })
  altura!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0
  })
  peso!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0
  })
  capacidad!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  imageUrl!: string

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}