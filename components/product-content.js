import * as React from 'react'
import cc from 'classcat'
import { ChevronDownSmallIcon } from '@/icons'
import Image from "next/image";
import { RichText } from '@graphcms/rich-text-react-renderer';

function ProductContent({ product }) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)
  const renderers = {
    h1: ({ children }) => <h1 class="mb-4 text-4xl text-gray-900 md:text-5xl lg:text-6xl">{children}</h1>,
    h2: ({ children }) => <h1 class="mb-4 text-3xl text-gray-900 md:text-5xl lg:text-6xl">{children}</h1>,
    h3: ({ children }) => <h3 class="text-3xl">{children}</h3>,
    h4: ({ children }) => <h4 class="">{children}</h4>,
    h5: ({ children }) => <h5 class="text-xl">{children}</h5>,
    h6: ({ children }) => <h6 class="text-large">{children}</h6>,
    p: ({ children }) => <p class="prose text-sm md:text-base md:max-w-none">{children}</p>,
    ul: ({ children }) => <ul class="list-disc list-inside my-4 text-lg">{children}</ul>,
    ol: ({ children }) => <ol class="list-decimal pl-4 my-4">{children}</ol>,
    li: ({ children }) => <li class="my-2">{children}</li>,
    code: ({ children }) => <code class="bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm">{children}</code>,
    code_block: ({ children }) => <pre class="bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm">{children}</pre>,
    bold: ({ children }) => <strong>{children}</strong>,
    img: ({ src, altText, handle, height, width }) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Image
          src={src}
          alt={altText}
          height={height}
          width={width}
          objectFit="cover"
        />
      </div>
    )
  }
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
            <div className="space-y-4">
              {/* <div
                className="prose text-sm md:text-base md:max-w-none"
                dangerouslySetInnerHTML={{ __html: product.content.html }}
              /> */}
              <RichText 
                content={product.content.json}
                renderers={renderers} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductContent
