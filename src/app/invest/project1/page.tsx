import { ProjectDetail } from "@/components/ProjectDetail";
import projectDataJson from "./data.json";
import type { ProjectData } from "./types";

export default function InvestPage() {
  const projectData: ProjectData = projectDataJson;

  const roi = parseFloat(
    projectData.investmentSummary.tir.replace(",", ".").replace("%", "")
  );
  const duration = parseInt(projectData.investmentSummary.totalDuration);

  return (
    <ProjectDetail projectData={projectData} roi={roi} duration={duration}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}