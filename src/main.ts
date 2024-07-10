import { registerPlugin } from '@yank-note/runtime-api'
import DocsifyGenerator from '@/components/DocsifyGenerator.vue'
import i18n from './i18n'
import docsify from '@/docsify'

import './style.css'

const extensionName = __EXTENSION_ID__

registerPlugin({
  name: extensionName,
  register (ctx) {
    ctx.statusBar.tapMenus(menus => {
      docsify.check(ctx)
      menus['status-bar-tool']?.list?.push({
        id: extensionName,
        type: 'normal',
        title: i18n.t('gen_docsify'),
        onClick: async () => {
          const gen = await ctx.ui.useModal().confirm({
            component: DocsifyGenerator
          })
          if (gen) {
            await docsify.gen(ctx)
          }
        }
      })
    })
  }
})
