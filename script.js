// script.js

class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
};

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        if (!this.head) {
            this.head = new Node(key, value);
            return;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(key, value);
        }
    }

    prepend(key, value) {
        const newHead = new Node(key, value, this.head);
        this.head = newHead;
    }

    size() {
        let total;
        if (!this.head) {
            return total = 0;
        } else {
            let current = this.head;
            total = 1;
            while (current.next) {
                current = current.next;
                total += 1;
            }
            return total;
        }
    }

    head() {
        return this.head;
    }

    tail() {
        if (!this.head) {
            return;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            return current;
        }
    }

    at(index) {
        let total;
        if (!this.head) {
            return;
        } else if (index === 0) {
            return this.head;
        } else {
            let current = this.head;
            total = 0;
            while (total != index) {
                current = current.next;
                total += 1;
            }
            return current;
        }
    }

    pop() {
        if (!this.head) {
            return;
        } else if (!this.head.next) {
            return this.head = null;
        } else {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            return current.next = null;
        }
    }

    contains(key) {
        if (!this.head) {
            return false;
        } else {
            let current = this.head;
            while (current) {
                if (current.key === key) {
                    return true;
                }
                current = current.next;
            }
            return false;
        }
    }

    find(key) {
        let total;
        if (!this.head) {
            return null;
        } else {
            let current = this.head;
            total = 0;
            while (current) {
                if (current.key === key) {
                    return total;
                }
                current = current.next;
                total += 1;
            }
            return null;
        }
    }

    removeAt(index) {
        let indexNode = this.at(index);
        let nextVal = indexNode.next;
        if (index === 0) {
            this.head = nextVal;
        } else {
            let previousNode = this.at(index - 1);
            previousNode.next = nextVal;
        }
    }
};

class HashMap {
    constructor(capacity, loadFactor) {
        capacity = this.capacity;
        loadFactor = this.loadFactor;
        size = capacity * loadFactor;
        hashTable = new Array(size).fill(null);
    };

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % size;
        }

        return hashCode;
    };

    /*
    First, hash the key
    Next, check if the index at the hashcode is null
    If null, create new LinkedList instance with key/value
    If not null, check list for the key.
    If key is in the list, update the corresponding value to the inputted value
    if key is not in list, add new data and run a check on number of keys stored
    If over bucket limit, resize
    */

    set(key, value) {
        let hashCode = hash(key);
        if (!hashTable[hashCode]) {
            hashTable[hashCode] = new LinkedList();
            hashTable[hashCode].append(key, value);
        } else if (!hashTable[hashCode].contains(key)) {
            hashTable[hashCode].append(key, value);
        } else {
            let current = hashTable[hashCode].head;
            while (current) {
                if (current.key === key) {
                    current.value = value;
                    break;
                }
                current = current.next;
            }
        }

// EDIT FOR CASE WHERE KEYS EXCEED BUCKETS CAPACITY

    };
}