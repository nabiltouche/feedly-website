"use client";

export default function DemoButton({
    children,
    className,
    id
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <button
            id={id}
            className={className}
            onClick={() => window.dispatchEvent(new Event("open-demo"))}
        >
            {children}
        </button>
    );
}
