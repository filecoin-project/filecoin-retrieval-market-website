
/**
 * Module dependencies.
 */

import Airtable from 'airtable';
import head from 'lodash/head';

/**
 * Airtable configure.
 */

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: process.env.AIRTABLE_API_BASE_URL
});

/**
 * Airtable instance.
 */

const airtable = Airtable.base(process.env.AIRTABLE_BASE_ID);

/**
 * Get table records.
 */

export async function getTableRecords(tableName: string) {
  const records = await airtable(tableName)
    .select({ view: 'table' })
    .all();

  return records.map(record => record.fields);
}

/**
 * Export `getRecords`.
 */

export async function getRecords() {
  const content = await getTableRecords('content');
  const settings = await getTableRecords('settings');
  const whyNow = await getTableRecords('whyNow');
  const whatWeDo = await getTableRecords('whatWeDo');
  const roadmap = await getTableRecords('roadmap');
  const teams = await getTableRecords('teams');
  const projectsOpportunities = await getTableRecords('projectsOpportunities');
  const progress = await getTableRecords('progress');
  const learnMore = await getTableRecords('learnMore');

  return {
    content: head(content),
    learnMore: head(learnMore),
    progress,
    projectsOpportunities,
    roadmap,
    settings,
    teams,
    whatWeDo: head(whatWeDo),
    whyNow: head(whyNow)
  };
}
