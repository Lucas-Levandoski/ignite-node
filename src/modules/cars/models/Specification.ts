import { v4 as uuidV4 } from 'uuid';


export class Specification {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor(name: string, description: string, created_at?: Date) {
    this.id = uuidV4();
    this.name = name;
    this.description = description;
    this.created_at = created_at ?? new Date();
  }
}