import { ChevronLeft, ChevronRight } from './Icons'

function pageItems(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const items = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)

  if (start > 2) items.push('start-ellipsis')
  for (let number = start; number <= end; number += 1) items.push(number)
  if (end < pageCount - 1) items.push('end-ellipsis')
  items.push(pageCount)
  return items
}

export default function Pagination({
  page,
  pageCount,
  onPage,
  label = 'Pagination',
  className = '',
}) {
  if (!pageCount || pageCount <= 1) return null

  return (
    <nav
      className={`pagination ${className}`.trim()}
      aria-label={label}
      data-page={page}
    >
      <button
        type="button"
        className="pagination__step"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={15} />
        <span>Previous</span>
      </button>

      <ol className="pagination__pages">
        {pageItems(page, pageCount).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                className={`pagination__page ${item === page ? 'is-current' : ''
                  }`}
                onClick={() => onPage(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Page ${item}`}
              >
                {String(item).padStart(2, '0')}
              </button>
            </li>
          ) : (
            <li key={item} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ),
        )}
      </ol>

      <button
        type="button"
        className="pagination__step"
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight size={15} />
      </button>
    </nav>
  )
}
