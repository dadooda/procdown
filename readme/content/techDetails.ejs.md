
## <%- me.title %>

### Only a subset of EJS template features are supported

Our source Markdown files can only use the EJS features, supported by its Deno implementation, [dejs](https://deno.land/x/dejs).

### Why is `m.up()` a function?

Source Markdown files of the `jackEN` and `jackRU` examples use the repetitive `m.up()` macro to generate the “go to top” element. It's a function, not just a regular string. Why?

The fact is that EJS template constructs are executed by plain JavaScript VM, which is notorious for its excessive error tolerance.
For example, `a<\%- m.noSuch %>b` will simply render as `ab`, even though `m.noSuch` doesn't exist.

One of the shortest ways to boost “error sensitivity” is to make macros callable functions. Now, if we make a mistake by writing `<\%- m.noSuch() %>`, the compilation will crash with a distinct error message:

```
Error in '…/readme/content/techDetails.ejs.md': m.noSuch is not a function
```

### Missing `Part` fields in module `p` are filled in automatically

Parts of our document are described in module `p.ts` as constants of type `Part`:

```ts
interface Part {
   title: string
   anchor: string
   core: string
}
```

The `title` field is mandatory.
As for `anchor` and `core`, the system can fill them with uniform default values.
In the `jackEN` and `jackRU` examples, the following is done:

1. Module `_p.ts` creates unfinished `Part` records, in which only the `title` field is present.
2. Module `p.ts` imports everything from `_p.ts` and fills in all unspecified `anchor` and `core` fields.
  Then it re-exports all constants, but in a finished form.

### GitHub always computes heading anchors from text

Some Markdown flavors allow to specify custom heading anchors.
GitHub doesn't seem to support it.
That is, on GitHub, the anchor of a title is always force-generated from its textual content.

Accordingly, when auto-filling the `anchor` field of unfinished `Part` records, we must behave like GitHub.
Our module <%- h.lsrc("lib/markdown.ts") %>, specifically `mkId()`, does this.

It's important to know that `mkId()` doesn't support all the features of the GitHub algorithm, as commented extensively in <%- h.lsrc("lib/markdown.ts") %> and <%- h.lsrc("lib/markdown.test.ts") %>.
If you've happened to improve `mkId()` in your project, bringing it closer to the GitHub algorithm, please share your craft by sending a pull request.

### Be careful about mutual dependencies of modules `bm`, `d`, `h`, `m` and `p`

Render-time, our templates receive the following object with data:

```ts
interface TplParams {
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
```

For simplicity and uniformity, exports from module `h.ts` are placed in field `h`, exports from `p.ts` in field `p`, and so on.

Because it's just TypeScript, modules can import each other, creating dependencies.
It is impossible to completely avoid such dependencies, and it's not necessary, indeed.

But be careful and don't get carried away.
It's pretty easy to create a circular dependency that will be marked with a following Deno error:

```
can't use ... before initialization
```
