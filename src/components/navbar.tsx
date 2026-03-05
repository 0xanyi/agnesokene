 "use client";
 
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import { cn } from "@/lib/utils";
 
 const links = [
   { href: "/", label: "Home" },
   { href: "/gallery", label: "Gallery" },
 ];
 
 export function Navbar() {
   const pathname = usePathname();
 
   return (
     <nav className="sticky top-0 z-50 border-b border-border bg-cream/80 backdrop-blur-md">
       <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
         <Link
           href="/"
           className="font-[family-name:var(--font-serif)] text-xl font-semibold text-foreground"
         >
           Mama Agnes Okene
         </Link>
         <div className="flex gap-6">
           {links.map((link) => (
             <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "text-sm transition-colors hover:text-gold",
                 pathname === link.href
                   ? "font-medium text-gold"
                   : "text-muted-foreground"
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
