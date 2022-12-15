
## <%- me.title %>

Understanding how Procdown works is easiest with examples. There are Deno programs in the root of this repository, each of which compiles its own document:

 Program | Data | Output
:-------:|:----:|:------:
<%- h.lsrc("jackEN.ts") %> | <%- h.lsrc("jackEN/") %> | <%- h.lsrc("jackEN.md") %>
<%- h.lsrc("jackRU.ts") %> | <%- h.lsrc("jackRU/") %> | <%- h.lsrc("jackRU.md") %>
<%- h.lsrc("readme.ts") %> | <%- h.lsrc("readme/") %> | `README.md`

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
