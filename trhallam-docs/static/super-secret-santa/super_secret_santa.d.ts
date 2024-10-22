/* tslint:disable */
/* eslint-disable */
/**
 * @param {string} key
 * @param {string} nonce
 * @param {string} ciphertext
 * @returns {string}
 */
export function decrypt_secret_santa(key: string, nonce: string, ciphertext: string): string;
/**
 * Create secret santa pairs
 * Takes a set of instructions as a line break delimited string.
 * @param {string} instructions
 * @returns {any}
 */
export function get_secret_santas(instructions: string): any;
