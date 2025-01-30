import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useLocation, useParams } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { getPostContent, getPostMeta, PostMeta } from "./Blog";
import './Blog.css';
const files = import.meta.glob("/src/posts/*", { query: '?raw', import: 'default',  });

export default function BlogPost() {
  const loc = useLocation();
  const { postId } = useParams()
  const [content, setContent] = useState("# Loading");
  const [loaded, setLoaded] = useState(false);
  const [meta, setMeta] = useState<PostMeta>({});

  useEffect(() => {
    const loadPost = async () => {
      await Promise.all(
        Object.entries(files).map(async ([path, importer]) => {
          const id = path.split("/").pop()?.split(".")[0] ?? "invalid"
          if (id != postId) return
          // @ts-expect-error: importer() should always return a string
          const rawContent: string = await importer()

          setContent(getPostContent(rawContent))
          setMeta(getPostMeta(rawContent))
          setLoaded(true)
          document.title = getPostMeta(rawContent).title
        })
      )
    }
    
    loadPost()
  }, [postId, loc])

  return (
    <div>
      <Markdown
        className="md lg:w-1/2 lg:p-0 p-8 mb-8 center w-full ml-auto mr-auto"
        remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                // @ts-expect-error style is complaining for no reason
                <SyntaxHighlighter style={oneDark} language={match[1]} {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
      >
        {content}
      </Markdown>

      <div className="md lg:w-1/2 lg:p-0 p-8 center w-full ml-auto mr-auto text-gray-400">
        {loaded && <i>Published on: {meta.date}</i>}
      </div>
    </div>
  )
}
