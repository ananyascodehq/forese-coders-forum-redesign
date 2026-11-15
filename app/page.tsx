import { Hero } from "@/components/home/hero";
import { CompileStory } from "@/components/home/compile-story";
import { BuildLog, JoinCta, MentorTeaser } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <CompileStory />
      <BuildLog />
      <MentorTeaser />
      <JoinCta />
    </>
  );
}
