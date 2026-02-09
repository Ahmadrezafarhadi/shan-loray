import { ProductService } from '../../lib/api/products';
import TechnologyClient from './TechnologyClient';

interface Technology {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
  tag: string;
  featured?: boolean;
}

export default async function ShanLorayTechnologyPage() {
  // Try to get technology data on server side
  let technologies: Technology[] = [];
  try {
    // For now, we'll let the client component handle the data fetching
    // In the future, we could fetch technologies from an API endpoint
    technologies = [];
  } catch (error) {
    // Handle error gracefully
    console.log('Error fetching technology data');
  }

  return <TechnologyClient initialTechnologies={technologies} />;
}



