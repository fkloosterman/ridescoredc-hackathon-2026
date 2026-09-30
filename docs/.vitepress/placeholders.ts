import type { ShikiTransformer } from 'shiki'

/**
 * In fenced code blocks, text written as <<like this>> is something the reader
 * must replace with their own value. The markers are removed and the text is
 * wrapped in a span with class "placeholder" (styled red in theme/custom.css).
 */
export const placeholders: ShikiTransformer = {
  name: 'placeholders',
  preprocess(code, options) {
    const decorations: any[] = []
    const lines = code.split('\n').map((line, lineNo) => {
      let out = ''
      let last = 0
      for (const m of line.matchAll(/<<([A-Za-z][^<>\n]*?)>>/g)) {
        out += line.slice(last, m.index)
        const start = out.length
        out += m[1]
        decorations.push({
          start: { line: lineNo, character: start },
          end: { line: lineNo, character: out.length },
          properties: { class: 'placeholder' }
        })
        last = m.index! + m[0].length
      }
      return out + line.slice(last)
    })
    if (!decorations.length) return
    options.decorations = [...((options.decorations as any[]) ?? []), ...decorations]
    return lines.join('\n')
  }
}
