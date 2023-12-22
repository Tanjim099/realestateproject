import Navbar from './Navbar';
import Footer from "./Footer";
import { Helmet } from "react-helmet"

function HomeLayout({ children, title, description, keywords, author }) {
    return (
        <div>
            <Helmet>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <main className=" min-h-[90vh]">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout