import Navbar from './Navbar';
import Footer from "./Footer"

function HomeLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main className=" min-h-[90vh]">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout