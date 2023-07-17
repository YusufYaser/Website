import { faArrowDown, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scroll from "react-scroll"
import githubIcon from './assets/github.svg'
import twitterIcon from './assets/twitter.svg'
import { useEffect, useRef } from "react";

function App() {
    const bg = useRef(null)

    useEffect(() => {
        // spawn circles
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement("p")
            circle.className = "bgcircle"
            const size = Math.floor(Math.random() * 400) + 100
            circle.style.width = `${size}px`
            circle.style.height = `${size}px`
            circle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            bg.current.appendChild(circle)
            circle.style.left = "-100px"
            circle.style.top = "-100px"
            
            setInterval(() => {
                circle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

                circle.style.left = `${Math.floor(Math.random() * bg.current.clientWidth * .95) - 100}px`
                circle.style.top = `${Math.floor(Math.random() * bg.current.clientHeight * .95) - 100}px`
            }, 2000)
        }
    }, [bg])

    return (
        <div>
            <div id="background" ref={bg}></div>
            <div id="bgblur"></div>

            <div className="section">
                <center className="content">
                    <h1>Hey there, my name is Yusuf Yaser!</h1>
                    A Backend Developer and a System Administrator
                    <br/><br/>
                    <span
                        style={{
                            cursor: 'pointer'
                        }}

                        onClick={() => {
                            Scroll.animateScroll.scrollTo(document.documentElement.clientHeight)
                        }}
                    >
                        <h2>
                            Go down to learn more
                        </h2>
                        <div className="downarrow">
                            <FontAwesomeIcon icon={faArrowDown}/>
                        </div>
                    </span>
                </center>
            </div>

            <div className="section">
                <center className="content">
                    <h1>Some stuff I'm doing</h1>
                    
                    <FontAwesomeIcon
                        className="icon"
                        style={{
                            filter: 'blur(16px)'
                        }}
                        icon={faQuestion}
                    />
                </center>
            </div>

            <div className="section">
                <center className="content">
                    <h1>Find me</h1>

                    <a
                        href={"https://github.com/YusufYaser"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            className="icon"
                            src={githubIcon}
                            alt={"YusufYaser's GitHub Page"}
                        />
                    </a>
                    <a
                        href={"https://twitter.com/RealYusufYaser"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            className="icon"
                            src={twitterIcon}
                            alt={"YusufYaser's Twitter Page"}
                        />
                    </a>
                </center>
            </div>

            <div className="section">
                <center className="content">
                    unfinished, will be updated more soon ;)
                    <br/><br/>
                    <strong>Copyright &copy; 2023 ~ Yusuf Yaser</strong>
                </center>
            </div>
        </div>
    );
}

export default App;
