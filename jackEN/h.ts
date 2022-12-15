
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

/** A shortcut to "Anchor"+"lower". */
export function al(obj: Parameters<typeof h.a>[0]): string {
  return h.a(obj, h.toLower)
}

/** A shortcut to "Link"+"lower". */
export function ll(obj: Parameters<typeof h.l>[0]): string {
  return h.l(obj, h.toLower)
}
