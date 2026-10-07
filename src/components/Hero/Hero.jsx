import { useContext } from "react"
import "./Hero.css"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router";

function Hero() {
    const { user } = useContext(UserContext);
    return (
        <section className="hero">

            <video
                className="hero-video"
                src="/videos/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="hero-overlay"></div>

            <div className="hero-content">
                <span>ArtBakery</span>

                <h1>Art made sweet.</h1>

                <p>
                    Custom iced cookies designed specially
                    for your special moments.
                </p>

                {user?.role !== 'admin' ? (<Link
                    to={user ? "/request" : "/sign-up"}
                >Request an Order</Link>) :
                    (<Link
                        to='/orders'

                    >Check your orders</Link>)}
            </div>

        </section>
    )
}

export default Hero