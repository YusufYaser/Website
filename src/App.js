import { faArrowDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import githubIcon from './assets/github.svg'
import twitterIcon from './assets/twitter.svg'
import linkedinIcon from './assets/linkedin.png'
import { useEffect, useRef, useState } from "react";
import useOnScreen from './useOnScreen'

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

function App() {
    const bg = useRef(null)
    const fgBlur = useRef(null)
    const section2 = useRef(null)
    const section2Visible = useOnScreen(section2)
    const [titleText, setTitleText] = useState("")
    const TITLE = "Hey there, my name is Yusuf Kelany"

    useEffect(() => {
        let lastScroll = window.scrollY
        window.addEventListener("scroll", (e) => {
            let delta = window.scrollY - lastScroll
            // bg.current.style.transitionDuration = "0s"
            // bg.current.style.top = `${-delta * 5}px`
            fgBlur.current.style.backdropFilter = `blur(${Math.abs(delta) / 20}px)`
            setTimeout(() => {
                // bg.current.style.transitionDuration = "1s"
                // bg.current.style.top = `0px`
                fgBlur.current.style.backdropFilter = `blur(${0}px)`
            }, 200)
            lastScroll = window.scrollY
        })
    }, [])

    useEffect(async () => {
        let id
        let curText = ""
        await wait(1000)
        id = setInterval(() => {
            curText += TITLE.charAt(curText.length)
            setTitleText(curText)
            if (curText.length >= TITLE.length) {
                clearInterval(id)
            }
        }, 50)
    }, [])

    useEffect(() => {
        for (let i = 0; i < 30; i++) {
            const circle = document.createElement("p")
            circle.className = "bgcircle"
            bg.current.appendChild(circle)
            bg.current.style.backdropFilter = `blur(${bg.current.clientWidth / 13}px)`
            
            setInterval(() => {
                circle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

                const size = (Math.random() * (30 - 10)) + 10
                circle.style.width = `${size}%`
                circle.style.height = `${size}%`

                circle.style.left = `${Math.random() * .95 * 100}%`
                circle.style.top = `${Math.random() * .95 * 100}%`
            }, Math.floor(Math.random() * 5000) + 1000)
        }
    }, [bg])

    return (
        <div>
            <div id="background" ref={bg}></div>
            <div id="bgblur"></div>
            <div id="fgblur" ref={fgBlur} style={{ backdropFilter: 'blur(0px)' }}></div>

            <div className="section">
                <center className="content">
                    <h1>{titleText} <i className="cursor"></i></h1>
                    Software Developer and System Administrator
                    <br/><br/>
                    <span>
                        <h2>
                            Scroll down for more
                        </h2>
                        <div className="downarrow">
                            <FontAwesomeIcon icon={faArrowDown}/>
                        </div>
                    </span>
                </center>
            </div>

            {/*<div className="section">
                <center className="content">
                    <h1>A thing I'm doing</h1>
                    
                    <a
                        href={"https://discord.gg/M7fJkaqwmk"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            className="icon"
                            src={gameIcon}
                            alt={"???"}
                        />  
                    </a>
                </center>
            </div>*/}

            <div className="section" style={{
                marginTop: '16rem'
            }}>
                <center className="content">
                    <h1 ref={section2}>Find and contact me</h1>

                    <a
                        href={"https://github.com/YusufYaser"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        className="icon-link"
                        draggable={false}
                    >
                        <img
                            className="icon"
                            src={githubIcon}
                            alt={"GitHub: YusufYaser"}
                            draggable={false}
                        />
                    </a>
                    <a
                        href={"https://x.com/RealYusufYaser"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        className="icon-link"
                        draggable={false}
                    >
                        <img
                            className="icon"
                            src={twitterIcon}
                            alt={"Twitter: @RealYusufYaser"}
                            draggable={false}
                        />
                    </a>
                    <a
                        href={"https://linkedin.com/in/yusufyaser"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        className="icon-link"
                        draggable={false}
                    >
                        <img
                            className="icon"
                            src={linkedinIcon}
                            alt={"Linkedin: yusufyaser"}
                            draggable={false}
                        />
                    </a>
                    <a
                        href={"mailto:me@yusufyaser.xyz"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        className="icon-link"
                        draggable={false}
                    >
                        <FontAwesomeIcon
                            className="icon"
                            icon={faEnvelope}
                        />
                    </a>
                </center>
            </div>

            <div className="section">
                <center className="content">
                    <strong>Copyright &copy; 2024 ~ Yusuf Kelany</strong>
                </center>
            </div>
        </div>
    );
}

export default App;
