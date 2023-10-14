import icons from "../../../services/IconService"
import Footer from "../component/Footer"
import Header from "../component/Header"


function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                {children}
            </div>

            <div className="chat-logo-container">
                <div className="chat-logo">
                    <icons.chat className="chat-logo" />
                    <span className="chat-logo-text">
                        <span>C</span>
                        <span>h</span>
                        <span>a</span>
                        <span>t</span>
                    </span>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout