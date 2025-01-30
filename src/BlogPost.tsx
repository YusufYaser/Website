import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useLocation } from "react-router";
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
      <Markdown className="md lg:w-1/2 lg:p-0 p-8 center w-full ml-auto mr-auto" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  )
}
