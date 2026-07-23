import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from "typeorm";

import { Moneda } from "./Moneda";


@Entity("criptomoneda")
export class Criptomoneda {

    @PrimaryGeneratedColumn()
    id!: number;


    @Column()
    nombre!: string;


    @Column({ unique: true })
    simbolo!: string;


    @ManyToMany(
        () => Moneda,
        (moneda) => moneda.criptomonedas
    )
    @JoinTable({
        name: "criptomoneda_moneda"
    })
    monedas!: Moneda[];
}
