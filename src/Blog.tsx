import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router';
import './Blog.css';
import TextAnimation from './components/TextAnimation';
const files = import.meta.glob("/src/posts/*", { query: '?raw', import: 'default',  });

interface Post {
  id: string;
  path: string;
  meta: PostMeta;
  content: string;
}

export interface PostMeta {
  [key: string]: string
}

export const getPostMeta = (content: string) => {
  const lines = content.split("\r\n").join("\n").split("\n")
  const meta: PostMeta = {}

  let readingMeta = lines[0] == "---"
  
  if (readingMeta) {
    lines.forEach((line, i) => {
      if (!readingMeta || i == 0) return
      if (line == "---") {
        readingMeta = false
        return
      }

      const key = line.split(": ")[0]
      const val = line.split(": ")[1]

      meta[key] = val
    })
  }

  return meta
}

export const getPostContent = (rawContent: string) => {
  rawContent = rawContent.split("\r\n").join("\n")
  const lines = rawContent.split("\n")

  if (lines[0] != "---") return rawContent

  const meta: PostMeta = getPostMeta(rawContent)

  for (let i = 0; i < Object.keys(meta).length + 3; i++) {
    lines.shift()
  }

  return lines.join("\n")
}

export default function Blog() {
  document.title = "Yusuf Kelany"

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const newPosts: Post[] = []

      await Promise.all(
        Object.entries(files).map(async ([path, importer]) => {
          // @ts-expect-error: importer() should always return a string
          const rawContent: string = await importer()
          const id = path.split("/").pop()?.split(".")[0] ?? "invalid"
          const meta: PostMeta = getPostMeta(rawContent)
          const content = getPostContent(rawContent)

          newPosts.push({
            path: path,
            id: id,
            meta: meta,
            content: content
          })
        })
      )

      setPosts(newPosts)
    }

    loadPosts();
  }, [])

  return (
    <div className="flex flex-col flex-wrap space-y-24 text-white content-center">
      <div>
        <h1 className="text-2xl font-bold text-center">
          <TextAnimation
            parts={[
              { text: "My " },
              { text: "Blog", className: "text-red-600" }
            ]}
            cursorVisible="always"
          />
        </h1>
      </div>

      <div>
        {posts.map(({ id, meta, content }) => {
          const lines = content.split("\n")

          return (
            <div key={id} className="max-w-[1024px] mb-8" style={{ width: 'calc(100vw - 4rem)' }}>
              <Link key={id} to={`/blog/${id}`}>
                <h1 className="text-white font-extrabold text-2xl">
                  {meta.title}
                </h1>
                <span className="text-gray-400 text-sm">{meta.date}</span>
                <Markdown className="text-gray-300">
                  {content.slice(lines[0].length, lines[0].length + 135) + ((content.length - lines[0].length) > 135 ? "..." : "")}
                </Markdown>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
