import * as React from 'react'
import cc from 'classcat'
import { ChevronDownSmallIcon } from '@/icons'

function ProductContent({ product }) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)

  return (
    <div className="pt-6">
      <div className="border-b-2 pb-4">
        <button
          className="text-lg text-left w-full flex justify-between items-start text-gray-400"
          onClick={toggleExpanded}
        >
          <span className="block text-sm font-bold tracking-widest uppercase mt-1 text-gray-900">
            Описание
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownSmallIcon
              className={cc([
                'h-6 w-6 transform',
                isExpanded ? '-rotate-180' : 'rotate-0'
              ])}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
      {isExpanded && (
        <div className="pt-4">
          {!product.content ? (
            'loading'
          ) : (
            <div className="divide-y-2 space-y-4">
              <div
                className="prose text-sm"
                dangerouslySetInnerHTML={{ __html: product.content.html }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductContent
