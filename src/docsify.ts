import { reactive } from 'vue'
import { Ctx } from '@yank-note/runtime-api'
import { IndexHtml, ReadmeDoc, genSideBar } from '@/templates'

class Docsify {
  config = reactive({
    sidebar: true,
  })

  readonly sidebarPath = '_sidebar.md'
  readonly indexPath = 'index.html'

  hasIndex: boolean = false
  hasSidebar: boolean = false

  private getIndexContent () {
    return IndexHtml(this.config.sidebar)
  }

  private async checkExists (ctx: Ctx) {
    const state = ctx.store.state
    const trees = await ctx.api.fetchTree(state.currentRepo!.name, state.treeSort)
    const exists: Record<string, boolean> = {}
    if (trees.length >= 1) {
      const tree = trees[0]
      tree.children?.forEach((c) => {
        if (c.type === 'file') {
          if (c.name === this.indexPath) {
            exists[this.indexPath] = true
          } else if (c.name === this.sidebarPath) {
            exists[this.sidebarPath] = true
          }
        }
      })
    }
    return exists
  }

  private async genSidebar (ctx: Ctx, isExist: boolean) {
    const state = ctx.store.state
    const trees = await ctx.api.fetchTree(state.currentRepo!.name, state.treeSort)
    if (trees.length >= 1) {
      const tree = trees[0]
      const lines = genSideBar(tree)
      if (isExist) {
        await ctx.doc.deleteDoc({
          repo: ctx.store.state.currentRepo!.name,
          path: this.sidebarPath,
        }, true)
      }
      const content = lines.join('\n')
      await ctx.doc.createDoc({
        repo: ctx.store.state.currentRepo!.name,
        path: this.sidebarPath,
        content,
      })
    }
  }

  async check(ctx: Ctx) {
    const exists = await this.checkExists(ctx)
    this.hasIndex = exists[this.indexPath] || false
    this.hasSidebar = exists[this.sidebarPath] || false
    if (this.hasIndex) {
      this.config.sidebar = this.hasSidebar
    }
  }

  async gen (ctx: Ctx) {
    if (!ctx.store.state.currentRepo) {
      return
    }

    const exists = await this.checkExists(ctx)
    if (this.config.sidebar) {
      await this.genSidebar(ctx, exists[this.sidebarPath] || false)
    }
    if (!exists[this.indexPath]) {
      await ctx.doc.createDoc({
        repo: ctx.store.state.currentRepo!.name,
        path: this.indexPath,
        content: this.getIndexContent(),
      })
      await ctx.doc.createDoc({
        repo: ctx.store.state.currentRepo!.name,
        path: 'README.md',
        content: ReadmeDoc(),
      })
    }
  }
}

export default new Docsify()
