import {Components} from "@yank-note/runtime-api/types/types/renderer/types";

export const IndexHtml = (sidebar: boolean) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      loadSidebar: ${sidebar},
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>`
}

export const genSideBar = (treeNode: Components.Tree.Node, deepth: number = 0) => {
    const { children } = treeNode
    const ret: string[] = []
    children?.forEach((c) => {
        if (c.type === 'dir') {
            if (c.name === 'FILES') {
                return
            }
            ret.push('\t'.repeat(deepth) + `* ${c.name}`)
            ret.push(...genSideBar(c, deepth + 1))
        } else if (c.type === 'file' && c.name.endsWith('.md') && !c.name.startsWith('_') && !c.name.startsWith('.') && c.name !== 'README.md') {
          let path = c.path
          if (path.startsWith('/')) {
            path = path.slice(1)
          }
          ret.push('\t'.repeat(deepth) + `* [${c.name.slice(0, -3)}](${path})`)
        }
    })
    return ret
}

export const ReadmeDoc = () => {
  return `# 这是首页

> 详细配置参考 [docsify文档](https://docsify.js.org/#/zh-cn/)`
}