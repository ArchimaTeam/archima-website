"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// -- Types --

interface NavLink {
    href: string;
    label: string;
    code: string; // The monospace "system code" shown on hover
}

// -- Data --

const NAV_LINKS: NavLink[] = [
    { href: "/", label: "Home", code: "SYS::ROOT" },
    { href: "/recruitment", label: "Recruitment", code: "SYS::RECRUIT" },
    { href: "/gallery", label: "Gallery", code: "SYS::ASSETS" },
    { href: "/press-kit", label: "Press Kit", code: "SYS::PRESS" },
];

// -- Sub-components --

function NavLinkItem({ link, isActive, onClick }: {
    link: NavLink;
    isActive: boolean;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={link.href}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative group flex flex-col items-start gap-0.5 py-1"
            aria-current={isActive ? "page" : undefined}
        >
            {/* Active indicator, a thin nyxium line on left */}
            {isActive && (
                <motion.span
                    layoutId="active-indicator"
                    className="absolute -left-3 top-0 bottom-0 w-px bg-[#C4B5FD]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}

            {/* System code which appears above label on hover */}
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        key="code"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="font-mono text-[9px] tracking-[0.2em] text-[#7335a6] uppercase leading-none"
                    >
                        {link.code}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Main label */}
            <span
                className={`font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${isActive
                        ? "text-[#FAFAFA]"
                        : "text-[rgba(250,250,250,0.5)] group-hover:text-[#C4B5FD]"
                    }`}
            >
                {link.label}
            </span>
        </Link>
    );
}

// -- Mobile Menu --

function MobileMenu({ isOpen, pathname, onClose }: {
    isOpen: boolean;
    pathname: string;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="mobile-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed inset-x-0 top-[57px] z-40 border-b border-[rgba(115,53,166,0.3)] bg-[#0f0519]"
                >
                    {/* Top edge - dissolving static line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7335a6] to-transparent opacity-60" />

                    <nav className="flex flex-col px-6 py-8 gap-6">
                        {NAV_LINKS.map((link) => (
                            <NavLinkItem
                                key={link.href}
                                link={link}
                                isActive={pathname === link.href}
                                onClick={onClose}
                            />
                        ))}
                    </nav>

                    {/* Recruitment CTA inside mobile menu */}
                    <div className="px-6 pb-8">
                        <Link
                            href="/recruitment"
                            onClick={onClose}
                            className="block w-full text-center font-mono text-xs tracking-widest uppercase border border-[#7335a6] px-6 py-3 text-[#C4B5FD] hover:bg-[#7335a6] hover:text-[#FAFAFA] transition-colors duration-200"
                        >
                            — We Are Recruiting —
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// -- Hamburger Button --

function HamburgerButton({ isOpen, onClick }: {
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-crosshair group"
        >
            <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-6 bg-[#FAFAFA] origin-center group-hover:bg-[#C4B5FD] transition-colors"
            />
            <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-px w-6 bg-[#FAFAFA] group-hover:bg-[#C4B5FD] transition-colors"
            />
            <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-6 bg-[#FAFAFA] origin-center group-hover:bg-[#C4B5FD] transition-colors"
            />
        </button>
    );
}

// -- Navbar (main export) --

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll detection, navbar gets a subtle border on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                        ? "border-b border-[rgba(115,53,166,0.3)] bg-[rgba(15,5,25,0.92)] backdrop-blur-sm"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                    {/* -- Logotype -- */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2"
                        aria-label="Archima — Home"
                    >
                        {/* Bracket motif with glitch on hover */}
                        <span className="relative font-mono text-sm tracking-[0.3em] uppercase font-bold text-[#FAFAFA] select-none">
                            {/* Glitch layer 1 */}
                            <span
                                aria-hidden
                                className="absolute inset-0 text-[#C4B5FD] opacity-0 group-hover:opacity-100 transition-none"
                                style={{
                                    animation: "glitch-clip-1 0.4s steps(1) infinite",
                                    willChange: "clip-path",
                                }}
                            >
                                [ ARCHIMA ]
                            </span>
                            {/* Glitch layer 2 */}
                            <span
                                aria-hidden
                                className="absolute inset-0 text-[#7335a6] opacity-0 group-hover:opacity-100 transition-none"
                                style={{
                                    animation: "glitch-clip-2 0.4s steps(1) 0.05s infinite",
                                    willChange: "clip-path",
                                }}
                            >
                                [ ARCHIMA ]
                            </span>
                            {/* Visible base */}
                            [ ARCHIMA ]
                        </span>
                    </Link>

                    {/* -- Desktop Nav -- */}
                    <nav
                        className="hidden md:flex items-center gap-8 pl-8 border-l border-[rgba(115,53,166,0.25)]"
                        aria-label="Primary navigation"
                    >
                        {NAV_LINKS.map((link) => (
                            <NavLinkItem
                                key={link.href}
                                link={link}
                                isActive={pathname === link.href}
                            />
                        ))}
                    </nav>

                    {/* -- Desktop CTA -- */}
                    <Link
                        href="/recruitment"
                        className="hidden md:inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-[rgba(115,53,166,0.5)] px-4 py-2 text-[#C4B5FD] hover:border-[#7335a6] hover:bg-[rgba(115,53,166,0.1)] hover:text-[#FAFAFA] transition-all duration-200"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5FD] animate-pulse" />
                        Recruiting
                    </Link>

                    {/* -- Mobile Hamburger -- */}
                    <HamburgerButton
                        isOpen={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    />
                </div>

                {/* Bottom edge, a dissolving gradient line */}
                <div
                    className={`h-px w-full bg-gradient-to-r from-transparent via-[#7335a6] to-transparent transition-opacity duration-300 ${scrolled ? "opacity-40" : "opacity-0"
                        }`}
                />
            </header>

            {/* Mobile menu rendered here, outside header, for full-width coverage */}
            <MobileMenu
                isOpen={menuOpen}
                pathname={pathname}
                onClose={() => setMenuOpen(false)}
            />

            {/* Spacer so content doesn't hide under fixed navbar */}
            <div className="h-14" aria-hidden />
        </>
    );
}


