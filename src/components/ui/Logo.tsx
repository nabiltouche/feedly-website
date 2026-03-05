"use client";

import Image from "next/image";

export default function Logo() {
    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <a href="#" onClick={scrollToTop} className="inline-block transition-transform hover:scale-105 active:scale-95">
            {/* 
        We expect the logo to be placed at /public/logo/feedly-logo.png later.
        For now, we render the Image but also a textual fallback inside an empty div if it fails to load,
        or just provide an alt text.
      */}
            <div className="relative w-40 h-12 flex items-center">
                <Image
                    src="/logo/feedly-logo.png"
                    alt="Feedly"
                    fill
                    className="object-contain object-left md:object-center"
                    sizes="160px"
                />
            </div>
        </a>
    );
}
