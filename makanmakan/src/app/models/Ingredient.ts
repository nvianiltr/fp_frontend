export class Ingredient {
  "name": string;
  "quantity": number;
  "unit": string;

  constructor(name:string, qty:number, unit:string) {
    this.name = name;
    this.quantity = qty;
    this.unit = unit;
  }
}
