
/**
 * Render content.
 */

import { bm, contentPname, d, h, m, p } from "./jackRU/mod.ts"
import { renderParts } from "./lib/engine.ts"

Deno.exit(await renderParts(p.allParts, contentPname, { bm, d, h, m, p }))
