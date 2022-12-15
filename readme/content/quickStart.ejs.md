
## <%- me.title %>

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
