import * as React from 'react';
import cc from 'classcat';
import { ChevronDownSmallIcon } from '@/icons';
import Image from 'next/image';
import { RichText } from '@graphcms/rich-text-react-renderer';

function ProductContent({ product }) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded);
  const renderers = {
    h1: ({ children }) => (
      <h1 className="mb-4 text-4xl text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h1 className="mb-4 text-3xl text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        {children}
      </h1>
    ),
    h3: ({ children }) => <h3 className="text-3xl">{children}</h3>,
    h4: ({ children }) => <h4 className="">{children}</h4>,
    h5: ({ children }) => <h5 className="text-xl">{children}</h5>,
    h6: ({ children }) => <h6 className="text-large">{children}</h6>,
    p: ({ children }) => (
      <p className="prose md:text-base md:max-w-none dark:text-surface-200">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="text-gray-900 dark:text-surface-200">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="prose list-disc list-inside my-4 dark:text-surface-200">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-4 my-4">{children}</ol>
    ),
    li: ({ children }) => <li className="my-2">{children}</li>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
        {children}
      </code>
    ),
    code_block: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2">
        {children}
      </pre>
    ),
    bold: ({ children }) => <strong>{children}</strong>,
    img: ({ src, altText, handle, height, width }) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src={src} alt={altText} height={height} width={width} />
      </div>
    ),
  };
  return (
    <div className="pt-10 pb-4">
      <div className="border-b-2 pb-4">
        <button
          className="text-lg text-left w-full flex justify-between items-start text-gray-400 dark:text-white"
          onClick={toggleExpanded}
        >
          <span className="block text-sm font-bold tracking-widest uppercase mt-1 text-gray-900 dark:text-white">
            Описание
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownSmallIcon
              className={cc([
                'h-6 w-6 transform',
                isExpanded ? '-rotate-180' : 'rotate-0',
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
              <RichText content={product.content.json} renderers={renderers} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductContent;
