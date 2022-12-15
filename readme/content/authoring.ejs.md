
## <%- me.title %>

Using <%- h.lsrc("jackEN.ts") %> as an example, let's have a view of the available authoring functions.

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

You can see how polishing works by looking at `h.pol()` calls in <%- h.lsrc("jackEN/_p.ts") %> and <%- h.lsrc("jackEN/content/dog.ejs.md") %>.
As a demonstration, the “rough” version, <%- h.lsrc("jackEN-rough.md") %>, features “*frog*” instead of “dog”. 😊
