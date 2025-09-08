export interface IProvidedService {
  id: string | null;
  serviceName: string;
  category: string;
  date: Date;
  price: number;
  discountedPrice: number;
}

export class ProvidedService implements IProvidedService {
  id: string | null;
  serviceName: string;
  category: string;
  date: Date;
  price: number;
  discountedPrice: number;

  constructor (serviceName: string, category: string, date: Date, price: number, discountedPrice: number) {
    this.id = null;
    this.serviceName = serviceName;
    this.category = category;
    this.date = date;
    this.price = price;
    this.discountedPrice = discountedPrice;
  }
}
