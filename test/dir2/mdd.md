# mdd

```html
<!-- --applet-- DEMO -->
<button onclick="ctx.ui.useToast().show(`info`, `HELLOWORLD!`)">TEST</button>
```

```js
// --run-- --output-html--
const state = ctx.store.state
const repoName = state.currentRepo.name
const tree = ctx.api.fetchTree(repoName, state.treeSort)
console.log(tree)
```
