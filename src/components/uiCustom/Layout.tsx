import React from 'react'

type GridPosition = {
  colSpan: number
  rowStart?: number
}

const layoutMap: Record<number, { cols: number; positions: GridPosition[] }> = {
  4: {
    cols: 5,
    positions: [
      { colSpan: 2 },
      { colSpan: 3 },
      { colSpan: 3, rowStart: 2 },
      { colSpan: 2, rowStart: 2 },
    ],
  },
  5: {
    cols: 6,
    positions: [
      { colSpan: 3 },
      { colSpan: 3 },
      { colSpan: 2, rowStart: 2 },
      { colSpan: 2, rowStart: 2 },
      { colSpan: 2, rowStart: 2 },
    ],
  },
}

export const BentoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const childArray = React.Children.toArray(children)
  const count = childArray.length
  const layout = layoutMap[count]

  if (layout) {
    return (
      <div className={`grid gap-6 grid-cols-1 md:grid-cols-${layout.cols}`}>
        {childArray.map((child, index) => {
          const { colSpan, rowStart } = layout.positions[index]
          const colClass = `md:col-span-${colSpan}`
          const rowClass = rowStart ? `md:row-start-${rowStart}` : ''
          return (
            <div key={index} className={`${colClass} ${rowClass}`}>
              {child}
            </div>
          )
        })}
      </div>
    )
  }

  // Default fallback layout
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-6">{children}</div>
}
