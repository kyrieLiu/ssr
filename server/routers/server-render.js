const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {url: ctx.path}
  // console.log('context11111', context)
  try {
    const appString = await renderer.renderToString(context)
    // console.log('context===', context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    context.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
