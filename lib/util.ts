
/**
 * General-purpose utilities.
 * @module
 */

/** Clone an object. */
export function clone<T>(obj: T): T {
  // deno-lint-ignore no-explicit-any
  const mo: T = <any>{}
  for (const k in obj) { mo[k] = obj[k] }
  return mo
}
