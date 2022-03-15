
/**
 * Export `ContentProps` interface.
 */

export interface ContentProps {
  whyNowDescription: string;
  homeDescription: string;
}

/**
 * Export `ProgressProps` interface.
 */

export interface ProgressProps {
  active: boolean;
  amount: number;
  description: string;
}

/**
 * Export `ProjectsOpportunitiesProps` interface.
 */

export interface ProjectProps {
  active: boolean;
  description: string;
  label: string;
  status: string;
  statusColor: string;
  tags: string;
  title: string;
  type: 'project' | 'opportunity';
  url?: string;
}

/**
 * Export `RoadmapProps` interface.
 */

export interface RoadmapProps {
  active: boolean;
  day: string;
  description: string;
  month: string;
}

/**
 * Export `SettingProps` interface.
 */

export interface SettingProps {
  value: string;
  type: 'email' | 'social-network' | 'footer-link';
  name: string;
}

/**
 * Export `TeamProps` interface.
 */

export interface TeamProps {
  active: boolean;
  description: string;
  iconImage: Array<{
    filename: string,
    height: number,
    id: string,
    url: string,
    type: string,
    width: number
  }>;
  subtitle: string;
  title: string;
  url: string;
}

/**
 * Export `APIResponse` type.
 */

export type APIResponse = {
  content: ContentProps | null,
  progress: ProgressProps[] | null,
  projectsOpportunities: ProjectProps[] | null,
  roadmap: RoadmapProps[] | null,
  settings: SettingProps[] | null,
  teams: TeamProps[] | null
};
