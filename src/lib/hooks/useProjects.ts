import { useState, useEffect } from 'react';

// Import project data directly
import project1Data from '@/app/invest/project1/data.json';
import project3Data from '@/app/invest/project3/data.json';
import project4Data from '@/app/invest/project4/data.json';
import project5Data from '@/app/invest/project5/data.json';
import project6Data from '@/app/invest/project6/data.json';

export interface Project {
  id: string;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  image: string;
  images?: string[];
  fundingGoal?: number;
  amountRaised?: number;
}

const projectsData = [project1Data, project3Data, project4Data, project5Data, project6Data] as Project[];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { projects, loading };
};
