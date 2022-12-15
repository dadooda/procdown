
/**
 * Macros, repeated strings.
 *
 * Everything exported from here is seen as `m.*` by the templates.
 */

import * as h from "./h.ts"
import * as p from "./p.ts"

export const up = () => h.l(p._head, "^")
