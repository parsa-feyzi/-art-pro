export default function dateToTimeHandler(date: string):string {
    return date.slice(0,10).replaceAll("-", " - ");
}