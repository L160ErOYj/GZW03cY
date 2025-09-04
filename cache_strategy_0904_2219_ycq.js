// 代码生成时间: 2025-09-04 22:19:14
// Cache Strategy using JS and Backbone framework

/**
 * CacheManager handles caching logic. It uses Backbone Model
 * to store cache data and implements a strategy pattern for cache eviction.
 */
class CacheManager extends Backbone.Model {
  
  // Initialize cache with a maximum size
  constructor(maxSize) {
    super();
    this.maxSize = maxSize;
    this.cache = {};
  }

  /**
   * Add or update an item in the cache
   * @param {string} key - The key to use for caching the item
   * @param {any} value - The value to cache
   */
  setItem(key, value) {
    if (this.cache[key] && this.size() >= this.maxSize) {
      this.removeItem(key);
    }
    this.cache[key] = value;
  }

  /**
   * Retrieve an item from the cache
   * @param {string} key - The key of the item to retrieve
   * @returns {any|null} - The cached item or null if not found
   */
  getItem(key) {
    return this.cache[key] || null;
  }

  /**
   * Remove an item from the cache
   * @param {string} key - The key of the item to remove
   */
  removeItem(key) {
    delete this.cache[key];
  }

  /**
   * Clear the entire cache
   */
  clear() {
    this.cache = {};
  }

  /**
   * Get the current size of the cache
   * @returns {number} - The number of items in the cache
   */
  size() {
    return Object.keys(this.cache).length;
  }
}

/**
 * LRUCacheStrategy implements the Least Recently Used eviction policy.
 * It keeps track of the order of item access and removes the least recently used items first.
 */
class LRUCacheStrategy extends CacheManager {
  
  // Initialize LRU Cache with a maximum size
  constructor(maxSize) {
    super(maxSize);
    this.accessOrder = [];
  }

  /**
   * Add or update an item in the cache
   * @param {string} key - The key to use for caching the item
   * @param {any} value - The value to cache
   */
  setItem(key, value) {
    if (this.getItem(key)) {
      this.accessOrder = this.accessOrder.filter(k => k !== key);
    }
    this.accessOrder.unshift(key);
    super.setItem(key, value);
    if (this.size() > this.maxSize) {
      const oldestKey = this.accessOrder.pop();
      this.removeItem(oldestKey);
    }
  }
}

// Example usage:
const cache = new LRUCacheStrategy(3);
cache.setItem('key1', 'value1');
cache.setItem('key2', 'value2');
cache.setItem('key3', 'value3');
console.log(cache.getItem('key1')); // Outputs: value1
cache.setItem('key4', 'value4'); // 'key2' is evicted as it was the least recently used
console.log(cache.getItem('key2')); // Outputs: null
