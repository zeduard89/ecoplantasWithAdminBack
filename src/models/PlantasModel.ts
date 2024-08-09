import { Model, Column, Table, DataType, AutoIncrement, PrimaryKey } from "sequelize-typescript"
import { IPlantas } from "../types/types"
import { INTEGER } from "sequelize"

@Table({ tableName: "plantas", timestamps: true })
export default class PlantasModel extends Model<IPlantas> {
  
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