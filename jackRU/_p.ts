
/**
 * Raw (incomplete) part-related data.
 *
 * This file should only be imported by `p.ts`.
 */

import { mkPart } from "../lib/engine.ts"
import { Part } from "../lib/types.ts"
import * as h from "./h.ts"

const _ = (title: string) => mkPart({ title })

export const _head      = _("Дом, который построил Джек")

// NOTE: Logical order.
export const dom       = _("Дом")
export const psh       = _("Пшеница")
export const sini      = _(h.pol("*Лисица*"))
export const kot       = _("Кот")
export const pes       = _("Пёс")
export const korova    = _("Корова")
export const star      = _("Старушка")
export const pastukh   = _("Пастух")
export const petukh    = _("Два петуха")

export const pad       = _("Pad")

//--------------------------------------

export const allParts: Part[] = [
  _head,

  dom,
  psh,
  sini,
  kot,
  pes,
  korova,
  star,
  pastukh,
  petukh,

  pad,
]

export const tocParts = allParts.slice(1, -1)
