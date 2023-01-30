import { faArrowDown, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scroll from "react-scroll";
import fiverrIcon from './assets/fiverr.svg'
import githubIcon from './assets/github.svg'
import twitterIcon from './assets/twitter.svg'

function App() {
    //
    return (
        <div className="content">
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
                            Scroll.animateScroll.scrollTo(document.documentElement.clientHeight, {
                                duration: 1500
                            })
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
                    
                    <a
                        href={"https://fiverr.com/yusufyaser"}
                        target={"_blank"}
                    >
                        <img
                            src={fiverrIcon}
                            className="icon"
                        />
                    </a>
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

                    <img
                        className="icon"
                        src={githubIcon}
                    />
                    <img
                        className="icon"
                        src={twitterIcon}
                    />
                </center>
            </div>

            <div className="section">
                <center className="content">
                    unfinished, will be updated more soon ;)
                </center>
            </div>
        </div>
    );
}

export default App;
