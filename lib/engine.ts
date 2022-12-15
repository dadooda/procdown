
/**
 * Rendering engine.
 * @module
 */

import { dejs, path } from "../deps.ts"
import * as markdown from "./markdown.ts"
import * as ro from "./ro.ts"
import { Part } from "./types.ts"
import { clone } from "./util.ts"

export interface TplParams {
  /** The part currently being rendered. */
  me: Part

  ///

  /** The bookmarks module. */
  bm: unknown

  /** The data module. */
  d: unknown

  /** The helpers module. */
  h: unknown

  /** The macros module. */
  m: unknown

  /** The parts module. */
  p: unknown
}

//--------------------------------------

/** Fix the "parts" module by stuffing default values instead of empty ones. */
// deno-lint-ignore ban-types
export function fixPartsModule(mod: Object) {
  for (const [ k, v ] of Object.entries(mod)) {
    if (("anchor" in v) && v.anchor == "") v.anchor = markdown.mkId(v.title)
    if (("core" in v) && v.core == "") v.core = k
  }

  return mod
}

/** Make a complete `Part` by having its partial. */
export function mkPart(src: Partial<Part>): Part {
  const out: Part = {
    // NOTE: We use static defaults since member types and behaviour may change.
    title: "",
    anchor: "",
    core: "",
  }

  const keys: (keyof Part)[] = [ "title", "anchor", "core" ]

  for (const k of keys) {
    if (k in src) out[k] = src[k]!
  }

  return out
}

/** Interactively render the given parts. Return 0 if success, 1 if error. */
export async function renderParts(parts: Part[], contentPname: string, fixedParams: Partial<TplParams>) {
  let out = ""
  let isError = false

  // We know it's going to be alright.
  const params = <TplParams>clone(fixedParams)

  // Main loop. Render parts.
  for (const part of parts) {
    if (ro.focus != undefined && !ro.focus.test(part.core)) continue

    const fname = path.join(contentPname, part.core + ".ejs.md")

    params.me = part

    try {
      let piece
      if (ro.src) piece = Deno.readTextFileSync(fname)
      else piece = await dejs.renderFileToString(fname, params)

      out += piece
    } catch (e) {
      console.error(`Error in '${fname}': ${e.message}`)
      isError = true
    }
  }

  if (isError) {
    console.error("Not rendering due to errors, see above")
    return 1
  }

  console.log(out)
  return 0
}
