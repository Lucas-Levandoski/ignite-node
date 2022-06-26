import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";


export class ListSpecificationsUseCase { 

  constructor(private specificationRepository: ISpecificationsRepository) { }

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}