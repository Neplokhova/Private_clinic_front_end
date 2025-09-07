export interface IService{
  id:  string | null;
  name: string;
  category: string;
  price: number;
}

export class Service implements IService{
  id:  string | null;
  name: string;
  category: string;
  price: number;

  constructor(id: string | null, name: string, category: string, price: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
  }
}
