export default async function delay(timeout: number){
   return new Promise((resolve) => {
        setTimeout(() => {
        resolve("");
        }, timeout);
    });
}