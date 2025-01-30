import { useEffect, useRef } from "react"

type Text = {
  text: string,
  className?: string
}

type TextAnimationProps = {
  parts: Text[],
  cursorVisible?: "always" | "typing" | "never"
}

export default function TextAnimation({ parts, cursorVisible }: TextAnimationProps) {
  const textRef = useRef<HTMLSpanElement[]>([])
  const typingRef = useRef<HTMLSpanElement>(null)

  
  useEffect(() => {
    if (!cursorVisible || cursorVisible == "never") typingRef.current!.style.display = "none"
    let interval: NodeJS.Timeout | null = null
    const currentParts: string[] = []
    interval = setInterval(() => {
      for (let i = 0; i <= parts.length; i++) {
        if (i == parts.length) { // nothing else to do
          clearInterval(interval as NodeJS.Timeout)
          if (cursorVisible == "typing") typingRef.current!.style.display = "none"
          break
        }

        if (!currentParts[i]) currentParts[i] = ""
        if (currentParts[i].length == parts[i].text.length) continue // already finished this part

        if (!textRef.current[i]) {
          clearInterval(interval as NodeJS.Timeout)
          break
        }

        currentParts[i] += parts[i].text[currentParts[i].length]
        textRef.current[i].innerText = currentParts[i]
        break // only one character at a time
      }
    }, 100);
  })

  return (
    <>
      &#x200B;
      {parts.map((text, i) => (
        <span key={i} ref={el => textRef.current[i] = el!} className={text.className}/>
      ))}
      <span ref={typingRef} className="pr-0.5 opacity-50 pulse">&#x200B;</span>
    </>
  )
}
