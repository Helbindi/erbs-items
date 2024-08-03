/**
 * Filter array of items into rarity buckets
 *
 * @param {Object[]} data - Array of items
 * @returns {Array} - Array containing three rarity Array bucket of items
 */
export function filterByRarity(data) {
  let filter = [[], [], []];

  for (const item of data) {
    switch (item.rarity) {
      case "Mythic": {
        filter[0] = [...filter[0], item];
        break;
      }
      case "Legendary": {
        filter[1] = [...filter[1], item];
        break;
      }
      case "Epic": {
        filter[2] = [...filter[2], item];
        break;
      }
    }
  }

  return filter;
}

/**
 * Filter items by User selected filtering options
 *
 * @param {Object[]} items - Array of items
 * @param {Object} filterOptions - Key/value pair of filtering criteria
 * @returns {Array} - Array of items that satisfy the filter
 */
export function dynamicFilter(items, filterOptions) {
  let filtered = items;
  if (filterOptions.type.length > 0) {
    filtered = filtered.filter((item) => item.type === filterOptions.type);
  }
  if (filterOptions.subtype.length > 0) {
    filtered = filtered.filter(
      (item) => item.subtype === filterOptions.subtype
    );
  }
  if (filterOptions.stats.length > 0) {
    filtered = filtered.filter((item) => checkStat(item, filterOptions.stats));
  }

  return filtered;
}

/**
 * Check if an item has the desired stats
 *
 * @param {Object} item
 * @param {string[]} verify - Array of stat names to be checked
 * @returns {Boolean} - True or False
 */
function checkStat(item, verify) {
  let result = [];
  // Check for 'Healing Reduction' passive name
  if (verify.includes("Healing Reduction")) {
    if (item.passive.name?.includes("Healing Reduction")) {
      result.push(true);
    }
  }

  for (const statObj of item.stats) {
    for (const x of verify) {
      if (x === "Life Steal" && statObj.name === "Omnisyphon") {
        result.push(true);
      }

      if (x === "Critical Strike" && statObj.name.includes("Critical Strike")) {
        result.push(true);
      }

      if (statObj.name === x) {
        result.push(true);
      }
    }
  }

  return result.length === verify.length;
}

export function findItemName(items, name) {
  const result = items.find((item) => item.name === name);
  return result;
}
