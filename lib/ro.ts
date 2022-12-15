
/**
 * Runtime options.
 * @module
 */

/**
 * Set env `FOCUS=ab.+c` to render parts with the specified `core`.
 * For the sake of simplicity, the matching is always case-sensitive.
 */
export let focus: RegExp | undefined; {
  const s = Deno.env.get("FOCUS"); if (s != undefined) {
    focus = new RegExp(s)
  }
}

/** Set env `SRC=!` to output template source rather than render it. */
export const src: boolean = Deno.env.get("SRC") == "!"

/** Set env `ROUGH=!` to output `h.pol()` fragments as is. */
export const rough: boolean = Deno.env.get("ROUGH") == "!"
