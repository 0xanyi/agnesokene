 "use client";
 
 import { useState, useRef } from "react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 
 export function TributeForm({ onSuccess }: { onSuccess?: () => void }) {
   const [submitting, setSubmitting] = useState(false);
   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
   const formRef = useRef<HTMLFormElement>(null);
   const renderTime = useRef(Date.now());
 
   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
     e.preventDefault();
     setSubmitting(true);
     setStatus("idle");
 
     const form = new FormData(e.currentTarget);
 
     const body = {
       name: form.get("name") as string,
       email: form.get("email") as string,
       relationship: form.get("relationship") as string,
       message: form.get("message") as string,
       _website: form.get("_website") as string,
       _rendered: renderTime.current.toString(),
     };
 
     try {
       const res = await fetch("/api/tributes", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
       });
 
       if (res.ok) {
         setStatus("success");
         formRef.current?.reset();
         renderTime.current = Date.now();
         onSuccess?.();
       } else {
         setStatus("error");
       }
     } catch {
       setStatus("error");
     } finally {
       setSubmitting(false);
     }
   }
 
   return (
     <section className="mx-auto max-w-2xl px-6 py-20">
       <div className="text-center">
         <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
           Leave Your Words
         </p>
         <h2 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-light md:text-5xl">
           Share a Memory
         </h2>
         <div className="mx-auto mt-6 h-px w-16 bg-border" />
         <p className="mt-6 text-warm-gray">
           Leave a tribute to celebrate Mama Agnes&apos;s life and legacy.
         </p>
       </div>
 
       <form
         ref={formRef}
         onSubmit={handleSubmit}
         className="mt-12 space-y-6"
       >
         {/* Honeypot - hidden from humans */}
         <div className="absolute -left-[9999px]" aria-hidden="true">
           <label htmlFor="_website">Website</label>
           <input
             type="text"
             id="_website"
             name="_website"
             tabIndex={-1}
             autoComplete="off"
           />
         </div>
 
         <div className="grid gap-6 md:grid-cols-2">
           <div className="space-y-2">
             <Label htmlFor="name">Your Name *</Label>
             <Input
               id="name"
               name="name"
               required
               placeholder="Full name"
             />
           </div>
           <div className="space-y-2">
             <Label htmlFor="email">Email (optional)</Label>
             <Input
               id="email"
               name="email"
               type="email"
               placeholder="your@email.com"
             />
           </div>
         </div>
 
         <div className="space-y-2">
           <Label htmlFor="relationship">Relationship</Label>
           <Input
             id="relationship"
             name="relationship"
             placeholder="e.g. Grandchild, Friend, Colleague"
           />
         </div>
 
         <div className="space-y-2">
           <Label htmlFor="message">Your Tribute *</Label>
           <Textarea
             id="message"
             name="message"
             required
             rows={5}
             placeholder="Share your favorite memory or words of tribute..."
           />
         </div>
 
         <Button
           type="submit"
           disabled={submitting}
           className="w-full bg-gold text-white hover:bg-gold-light md:w-auto md:px-10"
         >
           {submitting ? "Submitting..." : "Submit Tribute"}
         </Button>
 
         {status === "success" && (
           <p className="text-sm text-green-700" role="alert">
             Thank you for your tribute. It will appear after review.
           </p>
         )}
         {status === "error" && (
           <p className="text-sm text-destructive" role="alert">
             Something went wrong. Please try again later.
           </p>
         )}
       </form>
     </section>
   );
 }
