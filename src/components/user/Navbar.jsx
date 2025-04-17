import { Home, User, MessageSquare, Settings } from "lucide-react";
import { StickyNav } from "../ui/sticky-navbar";
import logo from "../../../public/images/common/logo.png";

export default function App() {
    const navItems = [
        { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
        { name: "About", link: "/about", icon: <User className="h-4 w-4" /> },
        { name: "Works", link: "/contact", icon: <MessageSquare className="h-4 w-4" /> },
        { name: "Skills", link: "/skills", icon: <Settings className="h-4 w-4" /> },
        { name: "Services", link: "/services", icon: <Settings className="h-4 w-4" /> },
        { name: "Blogs", link: "/blogs", icon: <Settings className="h-4 w-4" /> },
    ];

    return (
        <div className="relative">
            <StickyNav
                logo={logo}
                name="Anuj"
                navItems={navItems}
                mainItem="Let's Connect"
                mainItemLink="/contact"
            />
        </div>
    );
}