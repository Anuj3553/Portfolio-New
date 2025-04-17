import { Home, User, MessageSquare, Settings } from "lucide-react";
import { StickyNav } from "../../ui/sticky-navbar";
import avatar from "../../../../public/images/common/avatar.jpg";

export default function App() {
    const navItems = [
        { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
        { name: "About", link: "/about", icon: <User className="h-4 w-4" /> },
        { name: "Works", link: "/contact", icon: <MessageSquare className="h-4 w-4" /> },
        { name: "Services", link: "/services", icon: <Settings className="h-4 w-4" /> },
        { name: "Portfolio", link: "/portfolio", icon: <Settings className="h-4 w-4" /> },
        { name: "Blogs", link: "/blogs", icon: <Settings className="h-4 w-4" /> },
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