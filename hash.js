class HashMap {
  constructor() {
    this.capacity = 16;
    this.load = 0.75;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
  
    return hashCode;
  }

  grow() {
    this.capacity = this.capacity * 2;

    let element;
    let newBuckets = new Array(this.capacity);
    let allEntries = this.entries();

    for(let i = 0; i < allEntries.length; i++) {
      element = allEntries[i];

      this.spread(element[0], element[1], newBuckets);
    }
    this.buckets = [...newBuckets];

    return this.buckets;
  }

  spread(key, value, array) {
    let hashCode = this.hash(key);

    let list;

    let node = new Node;
    node.key = key;
    node.value = value;

    if (array[hashCode] < 0 || array[hashCode] >= array.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (array[hashCode] instanceof LinkedList) {
      list = array[hashCode];

      let nextNode = list.start;

      list.start = node;
      node.next = nextNode;
    } else if (array[hashCode] instanceof Node) {
      list = new LinkedList;
      let otherNode = array[hashCode];

      list.start = node;
      node.next = otherNode;
      array[hashCode] = list;
    } else array[hashCode] = node;
  }

  set(key, value) {
    let element = this.find(key);
    if (element) {
      element.value = value;
      return;
    }

    this.spread(key, value, this.buckets);

    if (this.length() > this.capacity * this.load) {
      this.grow();
    }
  }

  find(key) {
    let element;

    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined) continue;

      element = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        if (element.key === key) return element;
        element = element.next;
      }
    }

    return null;
  }

  get(key) {
    if (this.find(key) === null) return null;
    return this.find(key).value;
  }

  has(key) {
    if (this.find(key) === null) return false;
    return true;
  }

  remove(key) {
    let element;
    let previous;
    let list;
    let index;

    loop1: for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined || this.buckets[i] === null) continue;

      index = i;

      element = this.buckets[i];
      list = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        if (element.key === key) break loop1;
        
        previous = element;
        element = element.next;
      }
    }

    if (!element || element.key != key) return false;
      
    if (list.start) {
      if (list.start === element) {
        list.start = element.next;
        return true;
      }

      previous.next = element.next;
      return true;
    }

    this.buckets[index] = null;
    return true;
  }

  length() {
    let element;
    let count = 0;

    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined) continue;

      element = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        count++;
        element = element.next;
      }
    }
    return count;
  }

  clear() {
    for(let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    };
  }

  keys() {
    let element;
    let arr = [];

    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined) continue;

      element = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        arr.push(element.key);
        element = element.next;
      }
    };

    return arr;
  }

  values() {
    let element;
    let arr = [];

    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined) continue;

      element = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        arr.push(element.value);
        element = element.next;
      }
    };

    return arr;
  }

  entries() {
    let element;
    let arr = [];

    for(let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] === undefined) continue;

      element = this.buckets[i];

      while (element) {
        if (element.start) element = element.start;
        arr.push([element.key, element.value]);
        element = element.next;
      }
    };

    return arr;
  }
}

class LinkedList {
  constructor() {
    this.start = null;
  }

  toString() {
    let string = "";
    let current = this.start;

    while (current) {
      string = string.concat(`( ${current.key} : ${current.value} ) -> `);
      current = current.next;
    }
    string = string.concat("null");
    return string;
  }
}

class Node {
  constructor() {
    this.key = null;
    this.value = null;
    this.next = null;
  }
}

export { HashMap, LinkedList };