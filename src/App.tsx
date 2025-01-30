import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Home from './Home';
import Background from './components/Background';

interface NavbarButtonProps {
  text: string;
  href: string;
}

function NavbarButton(props: NavbarButtonProps) {
  const nav = useNavigate();

  return (
    <button className="text-white hover:underline text-xl lg:p-4 p-2" onClick={() => nav(props.href)}>
      {props.text}
    </button>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const AppRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />}/>
          <Route path={"blog"} element={<Blog />}/>
          <Route path={"blog/:postId"} element={<BlogPost />}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  setInterval(() => {
    const canvas: HTMLCanvasElement | null = document.querySelector("#tsparticles > canvas")
    if (canvas) canvas.style.opacity = window.location.pathname == '/' ? '1.0' : '0.5'
  }, 500)

  return (
    <>
      <BrowserRouter>
        <Background/>

        <div className="flex flex-row flex-wrap lg:space-x-16 text-white justify-center backdrop-blur-sm mb-4">
          <span className={"text-red-600 text-xl p-4 pr-16 font-extrabold"}>Yusuf Kelany</span>
          <NavbarButton text={"Home"} href={"/"} />
          <NavbarButton text={"Blog"} href={"/blog"} />
        </div>

        <AppRoutes/>
      </BrowserRouter>
    </>
  )
}
