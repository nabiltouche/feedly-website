"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";

export default function Logo() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const handleClick = (e: React.MouseEvent) => {
        if (isHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link
            href="/"
            onClick={handleClick}
            className="inline-block transition-transform hover:scale-105 active:scale-95"
        >
            {/* 
        We expect the logo to be placed at /public/logo/feedly-logo.png later.
        For now, we render the Image but also a textual fallback inside an empty div if it fails to load,
        or just provide an alt text.
      */}
            <div className="flex items-center">
                <Image
                    src="/logo/feedly-logo.png"
                    alt="Feedly"
                    width={256}
                    height={256}
                    priority
                    className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
            </div>
        </Link>
    );
}
