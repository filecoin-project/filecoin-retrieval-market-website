
/**
 * Export `NavbarLink` type.
 */

export type NavbarLink = {
  id: string,
  label: string
};

/**
 * Export `sectionsIds`.
 */

export const sectionsIds = {
  sectionContact: 'sectionContact',
  sectionProgress: 'sectionProgress',
  sectionProjectsAndOpportunities: 'sectionProjectsAndOpportunities',
  sectionRoadmap: 'sectionRoadmap',
  sectionTeams: 'sectionTeams',
  sectionWhatWeDo: 'sectionWhatWeDo',
  sectionWhyNow: 'sectionWhyNow'
};

/**
 * Export `navbarLinks`.
 */

export const navbarLinks: NavbarLink[] = [{
  id: sectionsIds.sectionWhyNow,
  label: 'Why Now'
}, {
  id: sectionsIds.sectionWhatWeDo,
  label: 'What we do'
}, {
  id: sectionsIds.sectionProgress,
  label: 'Progress'
}, {
  id: sectionsIds.sectionProjectsAndOpportunities,
  label: 'Projects & Opportunities'
}, {
  id: sectionsIds.sectionTeams,
  label: 'Teams'
}, {
  id: sectionsIds.sectionRoadmap,
  label: 'Roadmap'
}, {
  id: sectionsIds.sectionContact,
  label: 'Contact'
}];
