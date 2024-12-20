import { useEffect, useRef } from "react"

type Text = {
  text: string,
  className: string
}

type TextAnimationProps = {
  parts: Text[]
}

export default function TextAnimation({ parts }: TextAnimationProps) {
  const textRef = useRef<HTMLSpanElement[]>([])
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    const currentParts: string[] = []
    interval = setInterval(() => {
      for (let i = 0; i <= parts.length; i++) {
        if (i == parts.length) { // nothing else to do
          clearInterval(interval as NodeJS.Timeout)
          break
        }

        if (!currentParts[i]) currentParts[i] = ""
        if (currentParts[i].length == parts[i].text.length) continue // already finished this part

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
    </>
  )
}
