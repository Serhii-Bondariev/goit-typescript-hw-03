// Key.ts

export class Key {
  private readonly _signature: number;

  constructor() {
    this._signature = Math.random();
  }

  getSignature(): number {
    return this._signature;
  }
}

// Person.ts

export class Person {
  private readonly _name: string;
  private readonly _key: Key;

  constructor(name: string, key: Key) {
    this._name = name;
    this._key = key;
  }

  getName(): string {
    return this._name;
  }

  getKey(): Key {
    return this._key;
  }
}

// House.ts

export abstract class House {
  protected _door: boolean;
  protected readonly _key: Key;
  protected readonly _tenants: Person[] = [];

  constructor(door: boolean, key: Key) {
    this._door = door;
    this._key = key;
  }

  comeIn(person: Person): void {
    if (this._door) {
      this._tenants.push(person);
      console.log(`${person.getName()} заходить в будинок.`);
    } else {
      console.log(`Двері закриті. ${person.getName()} не може зайти.`);
    }
  }

  abstract openDoor(key: Key): void;
}

// MyHouse.ts

export class MyHouse extends House {
  constructor(key: Key) {
    super(false, key);
  }

  openDoor(key: Key): void {
    if (key.getSignature() === this._key.getSignature()) {
      this._door = true;
      console.log("Двері відчинені!");
    } else {
      console.log("Неправильний ключ!");
    }
  }
}

// main.ts

const myKey = new Key();
const myHouse = new MyHouse(myKey);
const johnDoe = new Person("Іван Довгань", myKey);
const janeDoe = new Person("Іванна Довгань", new Key());

console.log("Іван Довгань підходить до будинку.");
myHouse.openDoor(johnDoe.getKey());
myHouse.comeIn(johnDoe);

console.log("Іванна Довгань підходить до будинку.");
myHouse.openDoor(janeDoe.getKey());
myHouse.comeIn(janeDoe);
