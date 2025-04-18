import { Home, User, MessageSquare, Settings } from "lucide-react";
import { StickyNav } from "../../ui/sticky-navbar";
import avatar from "../../../../public/images/common/avatar.jpg";

export default function App() {
    const navItems = [
        { id: "home", name: "Home", link: "#home" },
        { id: "about", name: "About", link: "#about" },
        { id: "works", name: "Works", link: "/works" },
        { id: "services", name: "Services", link: "/services" },
        { id: 5, name: "Portfolio", link: "/portfolio" },
        { id: 6, name: "Blogs", link: "/blogs" },
    ];

    return (
        <div className="relative">
            <StickyNav
                avatar={avatar}
                name="Anuj"
                navItems={navItems}
                mainItem="Let's Connect"
                mainItemLink="#contact"
            />
        </div>
    );
}