import { ctx } from '@yank-note/runtime-api'
import {Components} from "@yank-note/runtime-api/types/types/renderer/types";

export const IndexHtml = (sidebar: boolean) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      loadSidebar: ${sidebar},
    }
  </script>
  <script src="https://fastly.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>`
}

export const genSideBar = (treeNode: Components.Tree.Node, deepth: number = 0) => {
    const { children } = treeNode
    const ret: string[] = []
    children?.forEach((c) => {
        if (c.type === 'dir') {
            const res = genSideBar(c, deepth + 1)
            if (res.length === 0) return

            ret.push('\t'.repeat(deepth) + `* ${c.name}`)
            ret.push(...res)
        } else if (ctx.doc.isMarkdownFile(c) && !c.name.startsWith('_') && !c.name.startsWith('.') && c.name !== 'README.md') {
          const path = ctx.utils.encodeMarkdownLink(c.path.startsWith('/') ? c.path.slice(1) : c.path)
          ret.push('\t'.repeat(deepth) + `* [${c.name.slice(0, -3)}](${path})`)
        }
    })
    return ret
}

export const ReadmeDoc = () => {
  return `# 这是首页

> 详细配置参考 [docsify文档](https://docsify.js.org/#/zh-cn/)`
}
