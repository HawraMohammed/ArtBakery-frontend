import "./Footer.css"
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-socials">
                <a href="https://www.instagram.com/kawjas/" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                </a>

                <a href="https://api.whatsapp.com/send/?phone=97339923981&text&type=phone_number&app_absent=0&utm_source=ig" aria-label="WhatsApp">
                    <i className="bi bi-whatsapp"></i>
                </a>

                <a href="https://www.tiktok.com/@kawjas" aria-label="TikTok">
                    <i className="bi bi-tiktok"></i>
                </a>
            </div>

            <p>© 2026 ArtBakery By Kawther. All rights reserved.</p>
        </footer>
    )
}

export default Footer