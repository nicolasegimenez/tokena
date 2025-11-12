import { ProjectDetail } from "@/components/ProjectDetail";
import projectData from "./data.json";

export default function InvestPage() {
  return (
    <ProjectDetail projectData={projectData} roi={32.5} duration={15}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}
