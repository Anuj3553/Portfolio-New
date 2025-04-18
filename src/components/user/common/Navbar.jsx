import { Home, User, MessageSquare, Settings } from "lucide-react";
import { StickyNav } from "../../ui/sticky-navbar";
import avatar from "../../../../public/images/common/avatar.jpg";

export default function App() {
    const navItems = [
        { key: 1, name: "Home", link: "/" },
        { key: 2, name: "About", link: "/about" },
        { key: 3, name: "Works", link: "/contact" },
        { key: 4, name: "Services", link: "/services" },
        { key: 5, name: "Portfolio", link: "/portfolio" },
        { key: 6, name: "Blogs", link: "/blogs" },
    ];

    return (
        <div className="relative">
            <StickyNav
                avatar={avatar}
                name="Anuj"
                navItems={navItems}
                mainItem="Let's Connect"
                mainItemLink="/contact"
            />
        </div>
    );
}