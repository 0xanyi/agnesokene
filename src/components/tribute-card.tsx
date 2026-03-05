 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import Image from "next/image";
 
 interface TributeCardProps {
   name: string;
   relationship?: string | null;
   message: string;
   photoUrl?: string | null;
   createdAt: string;
 }
 
 export function TributeCard({
   name,
   relationship,
   message,
   photoUrl,
   createdAt,
 }: TributeCardProps) {
   const date = new Date(createdAt).toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 
   return (
     <Card className="animate-fade-in-up border-border/50 bg-card shadow-sm">
       <CardContent className="p-6">
         <div className="flex items-start justify-between gap-4">
           <div>
             <p className="font-semibold text-foreground">{name}</p>
             {relationship && (
               <Badge variant="secondary" className="mt-1 text-xs">
                 {relationship}
               </Badge>
             )}
           </div>
           <time className="shrink-0 text-xs text-muted-foreground">{date}</time>
         </div>
         <p className="mt-4 leading-relaxed text-warm-gray whitespace-pre-line">
           {message}
         </p>
         {photoUrl && (
           <div className="relative mt-4 aspect-video overflow-hidden rounded-md">
             <Image
               src={photoUrl}
               alt={`Photo shared by ${name}`}
               fill
               className="object-cover"
             />
           </div>
         )}
       </CardContent>
     </Card>
   );
 }
