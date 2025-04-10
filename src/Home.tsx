
export default function Home() {
  document.title = "Yusuf Kelany"

  return (
    <div className="flex flex-col flex-wrap space-y-24 text-white content-center">
      <div className="mt-8">
        <h1 className="md:text-8xl font-[SuperComic] text-center yusuf">
          Yusuf K.
        </h1>
        <p className="mt-4 text-xl font-bold text-center">
          A Software Developer and System Administrator
        </p>
      </div>

      <div className="m-8">
        <h1 className="text-2xl font-bold text-center">
          Where to <span className="text-red-600">find</span> me
        </h1>
        
        <div className="grid grid-cols-2 gap-8 mt-8" id="socials">
          <a className="text-center m-auto" href="https://github.com/YusufYaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/github.svg" />
          </a>
          <a className="text-center m-auto" href="https://www.linkedin.com/in/yusufyaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/linkedin.png" />
          </a>
          <a className="text-center m-auto" href="https://discord.com/users/340426742466609152" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/discord.svg" />
          </a>
          <a className="text-center m-auto" href="https://x.com/RealYusufYaser" target="_blank" rel="noreferrer">
            <img className="size-24 object-contain lg:hover:scale-125 lg:active:scale-[80%] duration-150" src="/assets/twitter.svg" />
          </a>
        </div>
      </div>

      <div>
        <p className="pb-5 text-center">
          Copyright {'\u00a9'} {(new Date()).getFullYear()} Yusuf Kelany
          <br/>
          <a href="https://github.com/YusufYaser/Website" target="_blank" rel="noreferrer"
            className="text-blue-400 hover:text-blue-500">
            Go to the GitHub Repository
          </a>
        </p>
      </div>
    </div>
  )
}
