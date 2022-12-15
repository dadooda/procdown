
/**
 * Helper functions.
 *
 * Everything exported from here is seen as `h.*` by the templates.
 */

import * as h from "../lib/helpers.ts"
import { mkPol } from "../lib/tplUtil.ts"
import * as polish from "./polish.ts"

export * from "../lib/helpers.ts"
export const pol = mkPol(polish.vocab)

/** Generate link to source file or directory. */
export function lsrc(pname: string) {
  Deno.statSync(pname)      // Crash if pathname doesn't exist.
  return `[${pname}](${pname})`
}
