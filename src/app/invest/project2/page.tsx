import { ProjectDetail } from "@/components/ProjectDetail";
import projectData from "./data.json";

export default function InvestPage() {
  return (
    <ProjectDetail projectData={projectData} roi={18} duration={12}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}
