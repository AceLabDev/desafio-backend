import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToMany
} from "typeorm";

import { Criptomoneda } from "./Criptomoneda";

@Entity("moneda")
export class Moneda {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column({ unique: true })
    codigo!: string;


    @ManyToMany(
        () => Criptomoneda,
        (criptomoneda) => criptomoneda.monedas
    )
    criptomonedas!: Criptomoneda[];
}
