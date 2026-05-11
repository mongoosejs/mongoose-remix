import { navigate, run } from 'remix/ui'

const app = run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
  async resolveFrame(src, signal, target) {
    let headers = new Headers({ accept: 'text/html' })
    if (target) headers.set('x-remix-target', target)

    let response = await fetch(src, {
      credentials: 'same-origin',
      headers,
      signal,
    })
    return response.body ?? response.text()
  },
})

document.addEventListener(
  'submit',
  async (event) => {
    let form = event.target as HTMLFormElement
    event.preventDefault()

    let response = await fetch(form.action, {
      body: new FormData(form),
      headers: {
        accept: 'text/html',
        'x-remix-frame-action': '1',
      },
      method: form.method,
    })

    if (!response.ok && response.type !== 'opaqueredirect') {
      window.alert(await response.text())
      return
    }

    if (form.dataset.remixReset !== 'false') {
      form.reset()
    }

    await app.ready()
    await navigate(window.location.href, {
      history: 'replace',
      resetScroll: false,
      src: form.dataset.remixFrameSrc ?? window.location.href,
      target: frame,
    })
  },
  { capture: true },
)

document.addEventListener('change', (event) => {
  let input = event.target
  if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') {
    return
  }

  let form = input.form
  if (!form?.dataset.remixFrame) {
    return
  }

  form.requestSubmit()
})
