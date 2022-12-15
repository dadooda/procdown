
/**
 * Markdown-specific utilities.
 * @module
 */

/** Generate anchor name (ID) from title text. */
export function mkId(title: string) {
  // As described by GitLab at https://docs.gitlab.com/ee/user/markdown.html#headers.
  // This is vastly primitive, GitHub is far more sophisticated than this:
  //
  // 1. All text is converted to lowercase.
  // 2. All non-word text (such as punctuation or HTML) is removed.
  // 3. All spaces are converted to hyphens.
  // 4. Two or more hyphens in a row are converted to one.
  // 5. *SKIP* If a header with the same ID has already been generated, a unique incrementing number is appended, starting at 1.
  //
  // Became known to us:
  //
  // 1. GitHub preserves "-".
  // 2. Heading and trailing non-word chars are stripped rather than converted to "-".
  // 3. GitHub preserves national Unicode characters, such as Cyrillic.
  //   RegExp handling example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp.
  // 4. GitHub erases certain punctuation characters.
  // 5. GitHub handles Markdown formatting. E.g. "_Joe_" becomes "#joe".

  let out = title.toLowerCase()

  out = out.replace(/[)!@#$%^&*(`~=+[{\]}\\\|;:'",<.>\/\?]/g, "")
  out = out.replace(/[^\-_\w\u0400-\u04FF]+/ug, "-")

  return out
}
