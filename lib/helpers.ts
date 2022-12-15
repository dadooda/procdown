
/**
 * Shared helper functions used across all documents of the project.
 * @module
 */

import { CanLink, HasAnchor, HasTitle } from "../lib/types.ts"

export type AltTitle =  string | ((s: string) => string)

//-------------------------------------- Exports

export const j = JSON.stringify

/** Format a named anchor. */
export function a(obj: HasAnchor & HasTitle, title?: AltTitle) {
  return `<a name="${obj.anchor}">${mkTitle(obj, title)}</a>`
}

/**
 * Format a Markdown link.
 * @example
 *
 * ```ts
 * l({ title: "Chapter 1", anchor: "chapter-1" })
 * l({ title: "Site", url: "https://site.com" })
 * l({ title: "Site", url: "https://site.com" }, "The site")
 * l({ title: "Site", url: "https://site.com" }, toLower)
 * ```
 */
export function l(obj: CanLink, title?: AltTitle) {
  const link = ("anchor" in obj) ? "#" + obj.anchor : obj.url
  return `[${mkTitle(obj, title)}](${link})`
}

/** Format a string in double quotes. */
export function q(s: string) {
  return "“" + s + "”"
}

export function toLower(s: string) {
  return s.toLocaleLowerCase()
}

//-------------------------------------- Service

function mkTitle(obj: HasTitle, title?: AltTitle): string {
  let out: string
  if (typeof(title) == "function") out = title(obj.title)
  else out = title ? title : obj.title
  return out
}
