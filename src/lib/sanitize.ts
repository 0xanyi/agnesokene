 export function sanitize(input: string, maxLength = 2000): string {
   return input
     .replace(/<[^>]*>/g, "")
     .replace(/&/g, "&amp;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#x27;")
     .trim()
     .slice(0, maxLength);
 }
