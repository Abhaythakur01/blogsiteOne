import { PortableText as PortableTextReact } from "@portabletext/react";
import { urlFor } from "../../lib/sanity";
import type { PortableTextBlock } from "@portabletext/types";

interface ImageValue {
  _type: "image";
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface CodeValue {
  _type: "code";
  code: string;
  language?: string;
}

const components = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            className="rounded-xl w-full shadow-sm"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-slate-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: { value: CodeValue }) => {
      return (
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6">
          <code className={`language-${value.language || "text"}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-900">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-8 mb-3 text-slate-900">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-bold mt-6 mb-2 text-slate-900">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="my-4 leading-7 text-slate-600">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-slate-500 bg-slate-50 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 my-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="my-2 text-slate-600">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="my-2 text-slate-600">{children}</li>
    ),
  },
};

interface Props {
  value: PortableTextBlock[];
}

export default function PortableText({ value }: Props) {
  return <PortableTextReact value={value} components={components} />;
}
