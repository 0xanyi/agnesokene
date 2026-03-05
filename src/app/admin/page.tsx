 "use client";
 
 import { useState, useCallback } from "react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { Badge } from "@/components/ui/badge";
 
 interface Tribute {
   id: string;
   name: string;
   email: string | null;
   relationship: string | null;
   message: string;
   approved: boolean;
   createdAt: string;
 }
 
 export default function AdminPage() {
   const [secret, setSecret] = useState("");
   const [authenticated, setAuthenticated] = useState(false);
   const [tributes, setTributes] = useState<Tribute[]>([]);
   const [loading, setLoading] = useState(false);
 
   const fetchPending = useCallback(async () => {
     setLoading(true);
     try {
       const res = await fetch("/api/admin/tributes", {
         headers: { Authorization: `Bearer ${secret}` },
       });
       if (res.ok) {
         const data = await res.json();
         setTributes(data.tributes);
         setAuthenticated(true);
       } else {
         setAuthenticated(false);
         alert("Invalid secret.");
       }
     } catch {
       alert("Failed to fetch tributes.");
     } finally {
       setLoading(false);
     }
   }, [secret]);
 
   async function handleAction(id: string, approved: boolean) {
     await fetch(`/api/admin/tributes/${id}/approve`, {
       method: "POST",
       headers: {
         Authorization: `Bearer ${secret}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ approved }),
     });
     setTributes((prev) => prev.filter((t) => t.id !== id));
   }
 
   if (!authenticated) {
     return (
       <div className="mx-auto max-w-md px-6 py-20">
         <h1 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-center mb-8">
           Admin Login
         </h1>
         <form
           onSubmit={(e) => {
             e.preventDefault();
             fetchPending();
           }}
           className="space-y-4"
         >
           <Input
             type="password"
             value={secret}
             onChange={(e) => setSecret(e.target.value)}
             placeholder="Enter admin secret"
           />
           <Button type="submit" className="w-full" disabled={loading}>
             {loading ? "Checking..." : "Login"}
           </Button>
         </form>
       </div>
     );
   }
 
   return (
     <div className="mx-auto max-w-3xl px-6 py-16">
       <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-center mb-8">
         Pending Tributes ({tributes.length})
       </h1>
 
       {tributes.length === 0 ? (
         <p className="text-center text-muted-foreground">
           No pending tributes to review.
         </p>
       ) : (
         <div className="space-y-6">
           {tributes.map((t) => (
             <Card key={t.id} className="border-border/50">
               <CardContent className="p-6">
                 <div className="flex items-start justify-between">
                   <div>
                     <p className="font-semibold">{t.name}</p>
                     {t.relationship && (
                       <Badge variant="secondary" className="mt-1 text-xs">
                         {t.relationship}
                       </Badge>
                     )}
                     {t.email && (
                       <p className="mt-1 text-xs text-muted-foreground">
                         {t.email}
                       </p>
                     )}
                   </div>
                   <time className="text-xs text-muted-foreground">
                     {new Date(t.createdAt).toLocaleDateString()}
                   </time>
                 </div>
                 <p className="mt-4 whitespace-pre-line text-warm-gray">
                   {t.message}
                 </p>
                 <div className="mt-4 flex gap-3">
                   <Button
                     size="sm"
                     className="bg-green-700 text-white hover:bg-green-800"
                     onClick={() => handleAction(t.id, true)}
                   >
                     Approve
                   </Button>
                   <Button
                     size="sm"
                     variant="destructive"
                     onClick={() => handleAction(t.id, false)}
                   >
                     Reject
                   </Button>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
       )}
     </div>
   );
 }
