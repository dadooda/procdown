
/**
 * Generic types used by all parts of the project.
 * @module
 */

export type CanLink =
  & HasTitle
  & (HasAnchor | HasUrl)

export interface HasAnchor {
  /** E.g. `some-chapter`. */
  anchor: string
}

export interface HasCore {
  /** File basename without extension. */
  core: string
}

export interface HasTitle {
  /** User-facing title, e.g. the one of the chapter. */
  title: string
}

export interface HasUrl {
  url: string
}

export type Part =
  & HasAnchor
  & HasCore
  & HasTitle
