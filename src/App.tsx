import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Home from './Home';

interface NavbarButtonProps {
  text: string;
  href: string;
}

function NavbarButton(props: NavbarButtonProps) {
  const nav = useNavigate();

  return (
    <button className="text-white hover:underline text-xl lg:p-8 p-2" onClick={() => nav(props.href)}>
      {props.text}
    </button>
  )
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-row flex-wrap lg:space-x-16 text-white justify-center">
          <span className={"text-red-600 text-xl p-8 pr-16 font-extrabold"}>Yusuf Kelany</span>
          <NavbarButton text={"Home"} href={"/"} />
          <NavbarButton text={"Blog"} href={"/blog"} />
        </div>

        <Routes>
          <Route index element={<Home />}/>
          <Route path={"blog"} element={<Blog />}/>
          <Route path={"blog/*"} element={<BlogPost />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
