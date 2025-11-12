import { ProjectDetail } from "@/components/ProjectDetail";
import projectData from "./data.json";

export default function InvestPage() {
  return (
    <ProjectDetail projectData={projectData} roi={165} duration={36}>
      {/* Additional project-specific sections can go here */}
    </ProjectDetail>
  );
}
