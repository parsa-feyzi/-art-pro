interface Props { secondaryWord: string, mainWord: string }

function SectionTitle({ secondaryWord, mainWord }: Props) {
  return (
    <div>{secondaryWord} <span className="text-primary">{mainWord}</span></div>
  )
}

export default SectionTitle