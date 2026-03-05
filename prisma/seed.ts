 import "dotenv/config";
 import { PrismaClient } from "../src/generated/prisma/client";
 import { PrismaPg } from "@prisma/adapter-pg";
 
 const adapter = new PrismaPg({
   connectionString: process.env.DATABASE_URL,
 });
 const prisma = new PrismaClient({ adapter });
 
 const galleryImages = [
   {
     url: "/images/offical-photo.JPG",
     caption: "Mama Agnes Okene -- a woman of grace and dignity",
     category: "Later Years",
     order: 1,
   },
   {
     url: "/images/mama.JPG",
     caption: "Mama Agnes, always radiant",
     category: "Later Years",
     order: 2,
   },
   {
     url: "/images/young-mama.JPG",
     caption: "Young Mama Agnes",
     category: "Early Years",
     order: 1,
   },
   {
     url: "/images/young-mama2.JPG",
     caption: "Mama Agnes in her younger days",
     category: "Early Years",
     order: 2,
   },
 ];
 
 async function main() {
   console.log("Seeding gallery images...");
 
   for (const img of galleryImages) {
     const existing = await prisma.galleryImage.findFirst({
       where: { url: img.url },
     });
     if (!existing) {
       await prisma.galleryImage.create({ data: img });
     }
   }
 
   console.log(`Seeded ${galleryImages.length} gallery images.`);
 }
 
 main()
   .then(() => prisma.$disconnect())
   .catch((e) => {
     console.error(e);
     prisma.$disconnect();
     process.exit(1);
   });
