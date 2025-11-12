import { ProjectDetail } from "@/components/ProjectDetail";
import projectData from "./data.json";

export default function InvestPage() {
  return (
    <ProjectDetail projectData={projectData} roi={12.5} duration={36}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}
