import { HashMap, LinkedList } from "./hash.js";


const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Set test
for (let i = 0; i < test.buckets.length; i++) {
  if (test.buckets[i] instanceof LinkedList) {
    console.log(test.buckets[i].toString());
  } else console.log(test.buckets[i]);
};

console.log(test.capacity);

console.log(test.length());

console.log('\n');


// Length test

test.set('eagle', 'cyan');

for (let i = 0; i < test.buckets.length; i++) {
  if (test.buckets[i] instanceof LinkedList) {
    console.log(test.buckets[i].toString());
  } else console.log(test.buckets[i]);
};



// Get test

console.log(test.get('apple'));
console.log(test.get('elephant'));
console.log(test.get('grape'));
console.log(test.get('lion'));


// Has test

console.log(test.has('apple'));
console.log(test.has('elephant'));
console.log(test.has('grape'));
console.log(test.has('lion'));
console.log(test.has('eagle'));
console.log(test.has('ant'));


// Remove test

console.log(test.remove('apple'));
console.log(test.remove('grape'));
console.log(test.remove('lion'));
console.log(test.remove('eagle'));


// Clear test

// console.log(test.clear());


// Keys test

console.log(test.keys());


// Values test

console.log(test.values());


// Entries test

console.log(test.entries());

console.log(test.capacity);

console.log(test.length());