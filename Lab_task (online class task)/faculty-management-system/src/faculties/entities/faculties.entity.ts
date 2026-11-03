import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('faculties')
export class Faculty {
  @PrimaryColumn()
  Id: string;
 
    @Column()
    Name: string;

    @Column()
    expertise: string;
    
    @Column({nullable: true})
    noOfPublication?: number;

}