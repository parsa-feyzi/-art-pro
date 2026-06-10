export function AboutBoxList({ list }: { list: string[] }) {
  return (
    <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
      {list.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-2 w-2 min-h-2 min-w-2 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}