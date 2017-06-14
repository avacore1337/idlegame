import { Counter } from "./Counter";
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
let counter = new Counter<string>();
console.log("testtesttest")
console.log(greeter.greet())
counter.add("balls", 5);
counter.add("balls", 5);
counter.add("cookies", 5);
console.log(counter.get("balls"));

let smallCounter = new Counter<string>();
smallCounter.add("balls", 2);
smallCounter.add("milk", 3);

let otherCounter = counter.addOther(counter);
console.log(otherCounter.get("balls"));
otherCounter = otherCounter.subtractOther(smallCounter);
console.log(otherCounter.get("balls"));
console.log(otherCounter.get("milk"));
console.log(otherCounter);
console.log(otherCounter.subtract("cookies", 10));
console.log(otherCounter.negative());
console.log(otherCounter.positive());
console.log(otherCounter.toString());
