import "./Hero.css"

function Hero() {
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

                <button>Request an Order</button>
            </div>

        </section>
    )
}

export default Hero