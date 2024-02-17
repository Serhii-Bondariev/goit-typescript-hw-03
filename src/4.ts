// const key = new Key();

// const house = new MyHouse(key);
// const person = new Person(key);

// house.openDoor(person.getKey());

// house.comeIn(person);


// export {};

// Key.ts

export class Key {
    private readonly signature: number;
  
    constructor() {
      this.signature = Math.random();
    }
  
    getSignature(): number {
      return this.signature;
    }
  }
  
  // Person.ts
  
  export class Person {
    private readonly name: string;
    private readonly key: Key;
  
    constructor(name: string, key: Key) {
      this.name = name;
      this.key = key;
    }
  
    getName(): string {
      return this.name;
    }
  
    getKey(): Key {
      return this.key;
    }
  }
  
  // House.ts
  
  export abstract class House {
    protected readonly door: boolean;
    protected readonly key: Key;
    protected readonly tenants: Person[] = [];
  
    constructor(door: boolean, key: Key) {
      this.door = door;
      this.key = key;
    }
  
    comeIn(person: Person): void {
      if (this.door) {
        this.tenants.push(person);
        console.log(`${person.getName()} enters the house.`);
      } else {
        console.log(`The door is closed. ${person.getName()} cannot enter.`);
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
      if (key.getSignature() === this.key.getSignature()) {
        this.door = true;
        console.log('The door is open!');
      } else {
        console.log('Wrong key!');
      }
    }
  }
  
  // main.ts
  
  const myKey = new Key();
  const myHouse = new MyHouse(myKey);
  const johnDoe = new Person('John Doe', myKey);
  
  console.log('John Doe approaches the house.');
  myHouse.openDoor(johnDoe.getKey()); // The door is open!
  myHouse.comeIn(johnDoe); // John Doe enters the house.
  
  const janeDoe = new Person('Jane Doe', new Key());
  console.log('Jane Doe approaches the house.');
  myHouse.openDoor(janeDoe.getKey()); // Wrong key!
  myHouse.comeIn(janeDoe); // The door is closed. Jane Doe cannot enter.
  