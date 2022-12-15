
# <%- me.title %><% n = 1 %>
<% for (const part of p.tocParts) { %>
<%- n++ %>. <%- h.l(part) %><% } %>
