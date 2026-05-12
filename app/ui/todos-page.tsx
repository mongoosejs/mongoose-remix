import { css, Frame } from 'remix/ui'

import { FrameForm } from './frame-form.tsx'

export interface TodoView {
  _id: unknown
  title: string
  status?: 'created' | 'done'
}

export interface TodosPageProps {
  todos: TodoView[]
}

const TODOS_FRAME_SRC = '/todos/frame'

export function TodosPage() {
  return () => (
    <main mix={pageStyle}>
      <section mix={headerStyle}>
        <p mix={eyebrowStyle}>Mongoose + Remix 3</p>
        <h1 mix={titleStyle}>Todos</h1>
      </section>

      <Frame name="todos" src={TODOS_FRAME_SRC} fallback={<p mix={emptyStyle}>Loading todos...</p>} />
    </main>
  )
}

export function TodosFrame() {
  return ({ todos }: TodosPageProps) => (
    <section>
      <FrameForm method="post" action="/todos" frame="todos" frameSrc={TODOS_FRAME_SRC} variant="create">
        <input name="title" placeholder="New todo" maxLength={200} required mix={inputStyle} />
        <button type="submit" mix={primaryButtonStyle}>
          Add
        </button>
      </FrameForm>

      <ul mix={listStyle}>
        {todos.map((todo) => {
          let id = String(todo._id)
          let done = todo.status === 'done'

          return (
            <li key={id} mix={itemStyle}>
              <FrameForm
                method="post"
                action={`/todos/${id}/toggle`}
                frame="todos"
                frameSrc={TODOS_FRAME_SRC}
                reset={false}
              >
                <input type="hidden" name="status" value={done ? 'created' : 'done'} />
                <input
                  type="checkbox"
                  checked={done ? true : undefined}
                  aria-label={done ? 'Mark incomplete' : 'Mark complete'}
                  title={done ? 'Mark incomplete' : 'Mark complete'}
                  mix={checkboxStyle}
                />
              </FrameForm>

              <span
                mix={done ? doneTitleStyle : itemTitleStyle}
                aria-label={done ? `${todo.title}, done` : todo.title}
              >
                {todo.title}
              </span>

              <FrameForm
                method="post"
                action={`/todos/${id}/delete`}
                frame="todos"
                frameSrc={TODOS_FRAME_SRC}
                reset={false}
              >
                <button type="submit" mix={deleteButtonStyle}>
                  Delete
                </button>
              </FrameForm>
            </li>
          )
        })}
      </ul>

      {todos.length === 0 ? <p mix={emptyStyle}>No todos yet.</p> : null}
    </section>
  )
}

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

const pageStyle = css({
  boxSizing: 'border-box',
  width: 'min(100%, 720px)',
  minHeight: '100vh',
  margin: '0 auto',
  padding: '64px 24px',
  color: '#17202a',
  fontFamily: FONT_STACK,
  '& *, & *::before, & *::after': {
    boxSizing: 'border-box',
  },
})

const headerStyle = css({
  marginBottom: '28px',
})

const eyebrowStyle = css({
  margin: '0 0 8px',
  color: '#5f6f52',
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
})

const titleStyle = css({
  margin: 0,
  fontSize: '42px',
  lineHeight: 1.1,
})

const inputStyle = css({
  width: '100%',
  minHeight: '44px',
  border: '1px solid #c8d1c1',
  borderRadius: '8px',
  padding: '0 12px',
  color: '#17202a',
  font: 'inherit',
  background: '#fbfcfa',
})

const baseButtonStyle = {
  minHeight: '40px',
  border: 0,
  borderRadius: '8px',
  padding: '0 14px',
  cursor: 'pointer',
  font: 'inherit',
  fontWeight: 700,
} as const

const primaryButtonStyle = css({
  ...baseButtonStyle,
  minHeight: '44px',
  background: '#2f6f4e',
  color: '#ffffff',
})

const listStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

const itemStyle = css({
  display: 'grid',
  gridTemplateColumns: '32px 1fr auto',
  alignItems: 'center',
  gap: '12px',
  minHeight: '56px',
  border: '1px solid #dce3d7',
  borderRadius: '8px',
  padding: '8px',
  background: '#ffffff',
})

const checkboxStyle = css({
  appearance: 'none',
  display: 'grid',
  placeItems: 'center',
  width: '22px',
  height: '22px',
  margin: '0 auto',
  border: '2px solid #8fa184',
  borderRadius: '6px',
  cursor: 'pointer',
  background: '#ffffff',
  '&:checked': {
    borderColor: '#2f6f4e',
    background: '#2f6f4e',
  },
  '&:checked::after': {
    content: '""',
    width: '6px',
    height: '11px',
    border: 'solid #ffffff',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  },
  '&:focus-visible': {
    outline: '3px solid #b8d7c5',
    outlineOffset: '2px',
  },
})

const itemTitleBaseStyle = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  fontSize: '16px',
} as const

const itemTitleStyle = css(itemTitleBaseStyle)

const doneTitleStyle = css({
  ...itemTitleBaseStyle,
  color: '#6d7667',
  textDecoration: 'line-through',
})

const deleteButtonStyle = css({
  ...baseButtonStyle,
  background: '#f6ece8',
  color: '#9b3323',
})

const emptyStyle = css({
  margin: '20px 0 0',
  color: '#6d7667',
})
