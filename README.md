
# Procedural Markdown

1. [Overview](#overview)
2. [How it works](#how-it-works)
3. [Examples](#examples)
4. [Authoring tools](#authoring-tools)
5. [Compiling your own document](#compiling-your-own-document)
6. [Technical details](#technical-details)
7. [Found better examples?](#found-better-examples)
8. [Copyright](#copyright)

## Overview

There are times when we need to write and maintain a multi-page Markdown document with a structure and a lot of internal links.

The Procdown approach connects parts of a Markdown document to a simple Deno TypeScript program which generates (“compiles”) the entire document.

## How it works

Document parts, most often chapters, are represented by individual Markdown files with template insertions in [EJS format](https://ejs.co). In addition to the template, each part exists as a program object of type `Part`.

The engine ties the parts together, populates the templates with data, and renders them sequentially, compiling the output document. Thus, if we make a mistake, the system will warn us immediately.

And, since it's just TypeScript and templates, we can *generate* elements of a document (e.g. the TOC), saving ourselves from heavy typing, time-consuming manual updates, and errors associated with all this.

Procdown *is an approach,* not a “turnkey solution”. This repository is just a starting point, *made as simple and compact and as possible,* to provide for maximum customization options.

## Examples

Understanding how Procdown works is easiest with examples. There are Deno programs in the root of this repository, each of which compiles its own document:

 Program | Data | Output
:-------:|:----:|:------:
[jackEN.ts](jackEN.ts) | [jackEN/](jackEN/) | [jackEN.md](jackEN.md)
[jackRU.ts](jackRU.ts) | [jackRU/](jackRU/) | [jackRU.md](jackRU.md)
[readme.ts](readme.ts) | [readme/](readme/) | `README.md`

To run the examples, follow the steps below.

[Install Deno](https://deno.land/manual/getting_started/installation).

Clone the repo:

```sh
git clone git@github.com:dadooda/procdown.git &&
cd procdown

```

Run task `all`:

```sh
deno task all
```

## Authoring tools

Using [jackEN.ts](jackEN.ts) as an example, let's have a view of the available authoring functions.

### Compiling

To compile the document, do a:

```sh
deno run --allow-env --allow-read jackEN.ts
```

, or, which is better:

```sh
deno task jackEN
```

In this repository, a Deno task is created for each of the documents, to save us typing `deno run` every time.

> 💡 *In the examples below, the compiled output goes to STDOUT. It's assumed that you know how to redirect output to a pager (`| less`) or a file (`> jackEN.md`).*

### Rendering selected parts of the document

To render selected parts of the document, use `FOCUS=`:

```sh
FOCUS=malt deno task jackEN
```

```sh
FOCUS="cat|dog" deno task jackEN
```

The value of `FOCUS=` is a case-sensitive [JavaScript regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

Each part's template is rendered independently of the others.
For example, if there are errors in the template `house`, the entire document won't compile.
But, if we focus on `cat|dog` only, everything will be just fine.

### Viewing the document source

To view the EJS source of the entire document, use `SRC=!`:

```sh
SRC=! deno task jackEN
```

Viewing the source is handy while optimizing the document as a whole, since EJS template insertions are output “as is”.

### Disabling “polishing”

To disable “polishing” of the output, use `ROUGH=!`:

```sh
ROUGH=! deno task jackEN
```

The “polishing” mechanism allows us to keep some “real” words in the source, which turn into “nominal” words when compiled.
This feature is useful to maintain examples and commands working in our local environment without exposing the real details like usernames, addresses and paths, to the world.

You can see how polishing works by looking at `h.pol()` calls in [jackEN/_p.ts](jackEN/_p.ts) and [jackEN/content/dog.ejs.md](jackEN/content/dog.ejs.md).
As a demonstration, the “rough” version, [jackEN-rough.md](jackEN-rough.md), features “*frog*” instead of “dog”. 😊

## Compiling your own document

Copy one of the “starter” documents, along with its data, to a new name, say, `newdoc`:

```sh
cp -dr jackEN newdoc
sed s/jackEN/newdoc/g jackEN.ts > newdoc.ts

```

Compile it:

```sh
deno run --allow-env --allow-read newdoc.ts
```

Works? Now fill TypeScript modules like `newdoc/_p.ts` and Markdown files in `newdoc/content/` with new content, and good luck!

## Technical details

### Only a subset of EJS template features are supported

Our source Markdown files can only use the EJS features, supported by its Deno implementation, [dejs](https://deno.land/x/dejs).

### Why is `m.up()` a function?

Source Markdown files of the `jackEN` and `jackRU` examples use the repetitive `m.up()` macro to generate the “go to top” element. It's a function, not just a regular string. Why?

The fact is that EJS template constructs are executed by plain JavaScript VM, which is notorious for its excessive error tolerance.
For example, `a<%- m.noSuch %>b` will simply render as `ab`, even though `m.noSuch` doesn't exist.

One of the shortest ways to boost “error sensitivity” is to make macros callable functions. Now, if we make a mistake by writing `<%- m.noSuch() %>`, the compilation will crash with a distinct error message:

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
Our module [lib/markdown.ts](lib/markdown.ts), specifically `mkId()`, does this.

It's important to know that `mkId()` doesn't support all the features of the GitHub algorithm, as commented extensively in [lib/markdown.ts](lib/markdown.ts) and [lib/markdown.test.ts](lib/markdown.test.ts).
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

## Found better examples?

I've gone through quite a few sample texts to demonstrate how Procdown works.
So far, `jackEN` and `jackRU` is the best I could come up with.

If you happen to stumble upon cooler examples to demonstrate Procdown on — please share them!

## Copyright

The product is free to use by everyone. Feedback of any kind is greatly appreciated.

— © 2022 Alex Fortuna

