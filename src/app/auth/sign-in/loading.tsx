import Section from "~components/section";

export default function Loading() {
  return (
    <Section>
      <div className="bg-zinc-300 animate-pulse dark:bg-zinc-700"></div>
      <div className="bg-zinc-300 animate-pulse dark:bg-zinc-700"></div>
      <div className="bg-zinc-300 animate-pulse dark:bg-zinc-700"></div>
    </Section>
  );
}
