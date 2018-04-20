export class Ingredient {
  "id": number;
  "name": string;
  "quantity": number;
  "unit": string;

  constructor(id: number, name:string, qty:number, unit:string) {
    this.id = id;
    this.name = name;
    this.quantity = qty;
    this.unit = unit;
  }
}
