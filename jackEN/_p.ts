
/**
 * Raw (incomplete) part-related data.
 *
 * This file should only be imported by `p.ts`.
 */

import { mkPart } from "../lib/engine.ts"
import { Part } from "../lib/types.ts"
import * as h from "./h.ts"

const _ = (title: string) => mkPart({ title })

export const _head      = _("The house that Jack built")

// NOTE: Logical order.
export const house      = _("House")
export const malt       = _("Malt")
export const rat        = _("Rat")
export const cat        = _("Cat")
export const dog        = _(h.pol("*Frog*"))
export const cow        = _("Cow")
export const maiden     = _("Maiden")
export const man        = _("Man")
export const priest     = _("Priest")
export const cock       = _("Cock")
export const farmer     = _("Farmer")
export const horse      = _("Horse")

export const pad        = _("Pad")

//--------------------------------------

export const allParts: Part[] = [
  _head,

  house,
  malt,
  rat,
  cat,
  dog,
  cow,
  maiden,
  man,
  priest,
  cock,
  farmer,
  horse,

  pad,
]

export const tocParts = allParts.slice(1, -1)
