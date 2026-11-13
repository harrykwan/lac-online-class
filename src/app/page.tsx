import { Hero } from "@/components/home/Hero";
import { DivisionOfLabor } from "@/components/home/DivisionOfLabor";
import { SeriesCardGrid } from "@/components/home/SeriesCardGrid";
import { LessonFormatDiagram } from "@/components/home/LessonFormatDiagram";
import { RoadmapTimeline } from "@/components/home/RoadmapTimeline";
import { AiVisionSection } from "@/components/home/AiVisionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <DivisionOfLabor />
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <SectionHeading
          eyebrow="Course Structure"
          title="課程總架構 — 五個獨立 Series"
          desc="每個範疇獨立一個系列，避免在不同範疇之間混淆；但每個 Series 都有互相連接的實際作業。點擊卡片進入系列，進度會自動儲存。"
        />
        <SeriesCardGrid />
      </section>
      <LessonFormatDiagram />
      <RoadmapTimeline />
      <AiVisionSection />
    </>
  );
}
