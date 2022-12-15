
## <%- me.title %>

Document parts, most often chapters, are represented by individual Markdown files with template insertions in [EJS format](https://ejs.co). In addition to the template, each part exists as a program object of type `Part`.

The engine ties the parts together, populates the templates with data, and renders them sequentially, compiling the output document. Thus, if we make a mistake, the system will warn us immediately.

And, since it's just TypeScript and templates, we can *generate* elements of a document (e.g. the TOC), saving ourselves from heavy typing, time-consuming manual updates, and errors associated with all this.

Procdown *is an approach,* not a “turnkey solution”. This repository is just a starting point, *made as simple and compact and as possible,* to provide for maximum customization options.
