// script.js

class HashMap {
    constructor(capacity, loadFactor) {
        capacity = this.capacity;
        loadFactor = this.loadFactor;
        size = capacity * loadFactor;
        hashTable = new Array(size).fill(null);
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % size;
        }

        return hashCode;
    }
}