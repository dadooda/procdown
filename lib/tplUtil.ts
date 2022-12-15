
/**
 * Utilities related to templates and rendering.
 * @module
 */

import * as ro from "./ro.ts"

const j = JSON.stringify

/**
 * Make a custom `pol()` helper, which does the following:
 *
 * "Polish" the specified "key string" by substituting a REAL value with a NOMINAL one.
*/
export function mkPol(vocab: Map<string, string>) {
  return (key: string) => {
    // Lookup the nominal value in any case.
    // Even if we're in rough mode, the key must exist.
    const nom = vocab.get(key)
    if (nom == undefined) throw new Error(`Pol key not defined\n\nPlease add an entry to \`polish.ts\`:\n\n  [ ${j(key)}, "replacement" ],\n`)

    if (ro.rough) return key
    else return nom
  }
}
