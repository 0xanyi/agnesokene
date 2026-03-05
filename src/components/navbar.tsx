 "use client";
 
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import { cn } from "@/lib/utils";
 
 const links = [
   { href: "/", label: "Home" },
   { href: "/tributes", label: "Tributes" },
   { href: "/gallery", label: "Gallery" },
 ];
 
 export function Navbar() {
   const pathname = usePathname();
 
   return (
     <nav className="sticky top-0 z-50 border-b border-border/30 bg-cream/90 backdrop-blur-xl">
       <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
         <Link
           href="/"
           className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-wide text-foreground"
         >
           Mama Agnes Okene
         </Link>
         <div className="flex items-center gap-8">
           {links.map((link) => (
             <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "text-[13px] uppercase tracking-[0.15em] transition-colors duration-200 hover:text-gold",
                 pathname === link.href
                   ? "font-medium text-gold-dark"
                   : "text-warm-gray"
               )}
             >
               {link.label}
             </Link>
           ))}
         </div>
       </div>
     </nav>
   );
 }
