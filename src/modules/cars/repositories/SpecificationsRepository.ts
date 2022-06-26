import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './implementations/ISpecificationsRepository';


export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification(name, description);

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(specification => specification.name === name);
  }

  list(): Specification[] {
    return this.specifications;
  }
}