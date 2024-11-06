import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const NavbarItems = [
        { label: "Home", href: "/" },
        { label: "Facility", href: "/facilities" },
        { label: "Rooms", href: "/rooms" },
        { label: "Contact", href: "/contact" },
    ];
    return (
        <>
            <div className="flex justify-between w-full px-20">
                <p className="bg-dark-background3 py-6 px-8 rounded-b-3xl tracking-widest">HOTELLO</p>
                <div className="">
                    <ul className="flex gap-x-8 mt-6">
                        {NavbarItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className={`font-semibold hover:opacity-70 ${location.pathname === item.href ? "border-b-2" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
