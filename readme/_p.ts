
/**
 * Raw (incomplete) part-related data.
 *
 * This file should only be imported by `p.ts`.
 */

import { mkPart } from "../lib/engine.ts"
import { Part } from "../lib/types.ts"

const _ = (title: string) => mkPart({ title })

export const _head          = _("Procedural Markdown")

// NOTE: Logical order.
export const overview       = _("Overview")
export const howitworks     = _("How it works")
export const examples       = _("Examples")
export const authoring      = _("Authoring tools")
export const quickStart     = _("Compiling your own document")
export const techDetails    = _("Technical details")
export const pleaseShare    = _("Found better examples?")
export const copyright      = _("Copyright")

//--------------------------------------

export const allParts: Part[] = [
  _head,

  overview,
  howitworks,
  examples,
  authoring,
  quickStart,
  techDetails,
  pleaseShare,
  copyright,
]

export const tocParts = allParts.slice(1)
