
/**
 * Export `ContentProps` interface.
 */

export interface ContentProps {
  whyNowDescription: string;
  homeDescription: string;
  teamsTitle: string;
}

/**
 * Export `LearnMoreProps` interface.
 */

export interface LearnMoreProps {
  subtitle: string;
  title: string;
  videoUrl: string;
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
  label?: string;
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
  type: 'cookies-button-link' | 'email' | 'social-network' | 'footer-link';
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
 * Export `WhatWeDoProps` interface.
 */

export interface WhatWeDoProps {
  subtitle: string;
  title: string;
}

/**
 * Export `WhyNowProps` interface.
 */

export interface WhyNowProps {
  buttonOneLabel?: string;
  buttonOneUrl?: string;
  buttonTwoLabel?: string;
  buttonTwoUrl?: string;
  how: string;
  subtitle: string;
  title: string;
  why: string;
}

/**
 * Export `APIResponse` type.
 */

export type APIResponse = {
  content: ContentProps | null,
  learnMore: LearnMoreProps | null,
  progress: ProgressProps[] | null,
  projectsOpportunities: ProjectProps[] | null,
  roadmap: RoadmapProps[] | null,
  settings: SettingProps[] | null,
  teams: TeamProps[] | null,
  whatWeDo: WhatWeDoProps | null,
  whyNow: WhyNowProps | null
};
