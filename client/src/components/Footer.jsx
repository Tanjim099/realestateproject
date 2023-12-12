function Footer() {
    return (
        <footer className="bg-[#2b3440]">
            <div className="grid gap-10 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  max-w-[1200px] mx-auto lg:grid-cols-4 p-10 text-neutral-content ">
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Social</header>
                    <a className="link link-hover">Twitter</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">Github</a>
                </nav>
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Explore</header>
                    <a className="link link-hover">Features</a>
                    <a className="link link-hover">Enterprise</a>
                    <a className="link link-hover">Security</a>
                    <a className="link link-hover">Pricing</a>
                </nav>
                <nav className="flex flex-col gap-4">
                    <header className="footer-title">Apps</header>
                    <a className="link link-hover">Mac</a>
                    <a className="link link-hover">Windows</a>
                    <a className="link link-hover">iPhone</a>
                    <a className="link link-hover">Android</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer