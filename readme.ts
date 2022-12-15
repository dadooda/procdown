
/**
 * Render content.
 */

import { renderParts } from "./lib/engine.ts"
import { bm, contentPname, d, h, m, p } from "./readme/mod.ts"

Deno.exit(await renderParts(p.allParts, contentPname, { bm, d, h, m, p }))
