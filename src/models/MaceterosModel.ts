import { Model, Column, Table, DataType, AutoIncrement, PrimaryKey } from "sequelize-typescript"
import { IMaceteros } from "../types/types"
import { INTEGER } from "sequelize"

@Table({ tableName: "maceteros", timestamps: true })
export default class MaceterosModel extends Model<IMaceteros> {
  
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
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  base!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  altura!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  largo!: string

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