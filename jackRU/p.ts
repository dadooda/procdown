
/**
 * Part-related data.
 *
 * Everything exported from here is seen as `p.*` by the templates.
 */

import { fixPartsModule } from "../lib/engine.ts"
import * as p from "./_p.ts"

fixPartsModule(p)
export * from "./_p.ts"
