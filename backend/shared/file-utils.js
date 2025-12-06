const fs = require("fs");

/**
 * @param {string} filename 
 * @returns {Promise<Object|Array>} 
 * @throws {Error}
 */

async function readFile(filename) {
  try {
    const file = fs.readFileSync(filename, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    throw new Error(`Couldn't read file ${filename}`);
  }
}

/**
 * @param {string} filename 
 * @param {Object|Array} updated 
 * @returns {Promise<void>} 
 * @throws {Error} 
 */
async function writeToFile(filename, updated) {
  try {
    const data = JSON.stringify(updated);
    fs.writeFileSync(filename, data, "utf-8");
  } catch (error) {
    throw new Error(`Couldn't write into file ${filename}`);
  }
}

module.exports = { readFile, writeToFile };
