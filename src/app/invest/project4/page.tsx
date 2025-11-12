import { ProjectDetail } from "@/components/ProjectDetail";
import projectData from "./data.json";

export default function InvestPage() {
  return (
    <ProjectDetail projectData={projectData} roi={22} duration={10}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}
