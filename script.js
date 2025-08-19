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
    constructor(capacity = 4, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = Math.floor(this.capacity * this.loadFactor);
        this.hashTable = new Array(this.buckets).fill(null);
        this.keysTotal = 0;
    };

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.buckets;
        }

        return hashCode;
    };

    /* If bucket has no values, insert linked list with value, and add to keysTotal counter
    
    If values present, check if bucket DOESN'T contain key. If absent, append to list and update keysTotal

    If both those checks fail, iterate through the specified bucket and update the value */

    set(key, value) {
        let hashCode = this.hash(key);
        if (!this.hashTable[hashCode]) {
            this.hashTable[hashCode] = new LinkedList();
            this.hashTable[hashCode].append(key, value);
            this.keysTotal += 1;
        } else if (!this.hashTable[hashCode].contains(key)) {
            this.hashTable[hashCode].append(key, value);
            this.keysTotal += 1;
        } else {
            let current = this.hashTable[hashCode].head;
            while (current) {
                if (current.key === key) {
                    current.value = value;
                    break;
                }
                current = current.next;
            }
        }

        /* Double bucket size, assign entries in current bucket to array, re-size hashTable.
        Need to reset keysTotal as set() will add from zero in next step.
        Next, re-assign values from entriesArr with set() to the newly sized hashTable */

        if (this.keysTotal === this.buckets) {
            this.buckets *= 2;
            let entriesArr = this.entries();
            this.hashTable = new Array(this.buckets).fill(null);

            for (let i = 0; i < entriesArr.length; i++) {
                this.set(entriesArr[i][0], entriesArr[i][1]);                
            }
        }

    };

    get(key) {
        let hashCode = this.hash(key);
        if (this.hashTable[hashCode]) {
            let current = this.hashTable[hashCode].head;
            while (current) {
                if (current.key === key) {
                    return current.value;
                }
                current = current.next;
            }
        }
        return null;
    };

    has(key) {
        let hashCode = this.hash(key);
        if (this.hashTable[hashCode]) {
            let current = this.hashTable[hashCode].head;
            while (current) {
                if (current.key === key) {
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    };

    remove(key) {
        let hashCode = this.hash(key);
        if (this.hashTable[hashCode]) {
            let index = this.hashTable[hashCode].find(key);
            if (index === null) return false;
            this.hashTable[hashCode].removeAt(index);
            this.keysTotal -= 1;
            return true;
            }
        return false;
    };

    length() {
        return this.keysTotal;
    };

    clear() {
        this.hashTable = new Array(this.buckets).fill(null);
        this.keysTotal = 0;
    };

    keys() {
        const keyArr = [];

        for (let i = 0; i < this.hashTable.length; i++) {
            if (this.hashTable[i]) {
                let current = this.hashTable[i].head;
                while (current) {
                    keyArr.push(current.key);
                    current = current.next;
                }
            }
        }
        return keyArr;
    };

    values() {
        const valArr = [];

        for (let i = 0; i < this.hashTable.length; i++) {
            if (this.hashTable[i]) {
                let current = this.hashTable[i].head;
                while (current) {
                    valArr.push(current.value);
                    current = current.next;
                }
            }
        }
        return valArr;
    };

    entries() {
        const entriesArr = [];

        for (let i = 0; i < this.hashTable.length; i++) {
            if (this.hashTable[i]) {
                let current = this.hashTable[i].head;
                while (current) {
                    entriesArr.push([current.key, current.value]);
                    current = current.next;
                }
            }
        }
        return entriesArr;
    };
}