import { useEffect, useRef } from 'react';
import './App.css';
import Background from "./components/Background";

type Title = {
  text: string[]
}

export default function App() {
  const title: Title = {
    text: ["Hey there, I'm ", "Yusuf Kelany", "!"]
  }

  const textRef = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    const currentTitle: Title = {
      text: ["", "", ""]
    }
    interval = setInterval(() => {
      for (let i = 0; i < 4; i++) {
        if (i == 3) {
          clearInterval(interval as NodeJS.Timeout)
          break
        }

        if (currentTitle.text[i].length == title.text[i].length) continue

        currentTitle.text[i] += title.text[i][currentTitle.text[i].length]
        textRef[i].current!.innerText = currentTitle.text[i]
        break
      }
    }, 100);
  });

  return (
    <div className="flex flex-col flex-wrap space-y-24 text-white content-center">
      <Background/>

      <div>
        <h1 className="text-2xl font-bold">
          &#x200B;<span ref={textRef[0]}/><span className="text-red-600" ref={textRef[1]} /><span ref={textRef[2]} />
          <span className="pr-0.5 opacity-50 pulse">&#x200B;</span>
        </h1>
        <p>
          A Software Developer and System Administrator
        </p>
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          Where to <span className="text-red-600">find</span> me
        </h1>
        
        <div className="grid grid-cols-3 gap-8 mt-4" id="socials">
          <a href="https://github.com/YusufYaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/github.svg" />
          </a>
          <a href="https://www.linkedin.com/in/yusufyaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/linkedin.png" />
          </a>
          <a href="https://discord.com/users/340426742466609152" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/discord.svg" />
          </a>
          <a href="https://x.com/RealYusufYaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/twitter.svg" />
          </a>
        </div>
      </div>


      {/* bottom spacing */}

      <div className="h-24"></div>
    </div>
  )
}
