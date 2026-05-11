import { css, type RemixNode } from 'remix/ui'

interface FrameFormProps {
  action: string
  children?: RemixNode
  frame: string
  frameSrc: string
  method?: 'post'
  reset?: boolean
  variant?: 'create'
}

export function FrameForm() {
  return ({
    action,
    children,
    frame,
    frameSrc,
    method = 'post',
    reset = true,
    variant,
  }: FrameFormProps) => (
    <form
      method={method}
      action={action}
      data-remix-frame={frame}
      data-remix-frame-src={frameSrc}
      data-remix-reset={reset ? undefined : 'false'}
      mix={variant === 'create' ? createFormStyle : baseFormStyle}
    >
      {children}
    </form>
  )
}

const baseFormStyle = css({
  margin: 0,
})

const createFormStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '10px',
  marginBottom: '24px',
})
