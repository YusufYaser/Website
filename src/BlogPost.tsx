import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useLocation } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { getPostContent, getPostMeta } from "./Blog";
import './Blog.css';

export default function BlogPost() {
  const loc = useLocation();
  const id = loc.pathname.split("/").pop()?.split(".")[0] ?? "invalid"
  const [content, setContent] = useState("# Loading");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const importer = () => import(`/src/posts/${id}.md?t=${Date.now()}import&raw`).then(m => m["default"])
        const rawContent = await importer()

        setContent(getPostContent(rawContent))
        document.title = getPostMeta(rawContent).title
      } catch (e) {
        console.error(e)
        document.title = "Not Found";
        setContent("Not Found")
      }
    }
    
    loadPost()
  }, [id, loc])

  return (
    <div>
      <Markdown
        className="md lg:w-1/2 lg:p-0 p-8 center w-full ml-auto mr-auto"
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
    </div>
  )
}
