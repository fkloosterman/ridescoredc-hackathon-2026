import type MarkdownIt from 'markdown-it'

/**
 * Renders "- [ ] item" and "- [x] item" list items as checkboxes, which plain
 * markdown-it (and so VitePress) leaves as literal brackets. The boxes are
 * disabled: they show a checklist, they don't store anything.
 */
export function taskLists(md: MarkdownIt) {
  md.core.ruler.after('inline', 'task-lists', (state) => {
    const tokens = state.tokens
    for (let i = 2; i < tokens.length; i++) {
      const inline = tokens[i]
      if (inline.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open' || tokens[i - 2].type !== 'list_item_open') continue
      const first = inline.children?.[0]
      const match = first?.type === 'text' && /^\[([ xX])\] /.exec(first.content)
      if (!first || !match) continue
      first.content = first.content.slice(4)
      const box = new state.Token('html_inline', '', 0)
      box.content = `<input class="task-list-item-checkbox" type="checkbox" disabled${match[1] === ' ' ? '' : ' checked'}> `
      inline.children!.unshift(box)
      tokens[i - 2].attrJoin('class', 'task-list-item')
    }
  })
}
