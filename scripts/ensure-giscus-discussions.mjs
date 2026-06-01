#!/usr/bin/env node
/**
 * Creates Giscus discussion threads for krwg site pages.
 * Usage: GH_TOKEN=ghp_... node scripts/ensure-giscus-discussions.mjs
 */
const REPO = { owner: 'krwg', name: 'krwg' };
const CATEGORY_NAME = 'General';
const TERMS = ['krwg-bio', 'krwg-graph', 'krwg-pet', 'krwg-contact', 'krwg-posts'];

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Set GH_TOKEN or GITHUB_TOKEN');
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const repoQuery = `
query($owner:String!,$name:String!){
  repository(owner:$owner,name:$name){
    id
    discussionCategories(first:10){nodes{id name}}
    discussions(first:50,categoryId:$catId){nodes{title number}}
  }
}`;

const createDiscussion = `
mutation($repoId:ID!,$catId:ID!,$title:String!,$body:String!){
  createDiscussion(input:{repositoryId:$repoId,categoryId:$catId,title:$title,body:$body}){
    discussion{number title url}
  }
}`;

const data = await gql(`
query($owner:String!,$name:String!){
  repository(owner:$owner,name:$name){
    id
    discussionCategories(first:10){nodes{id name}}
    discussions(first:100){nodes{title number}}
  }
}`, REPO);

const repo = data.repository;
if (!repo) throw new Error('Repository not found');

const cat = repo.discussionCategories.nodes.find((c) => /general/i.test(c.name))
  || repo.discussionCategories.nodes[0];
if (!cat) throw new Error('No discussion categories — enable Discussions on krwg/krwg');

console.log('Category:', cat.name, cat.id);
console.log('Add to docs/assets/giscus-config.js → categoryId:', JSON.stringify(cat.id));

const keyFromTerm = (t) => t.replace(/^krwg-/, '');
const discussionMap = {};

const existing = new Map((repo.discussions?.nodes || []).map((d) => [d.title, d]));

for (const term of TERMS) {
  if (existing.has(term)) {
    const n = existing.get(term).number;
    discussionMap[keyFromTerm(term)] = n;
    console.log('exists:', term, '#', n);
    continue;
  }
  const created = await gql(createDiscussion, {
    repoId: repo.id,
    catId: cat.id,
    title: term,
    body: `Giscus thread for **${term}** on [krwg.github.io/krwg](https://krwg.github.io/krwg/).`
  });
  const d = created.createDiscussion.discussion;
  discussionMap[keyFromTerm(term)] = d.number;
  console.log('created:', d.title, d.url);
}

console.log('\nAdd to giscus-config.js → discussions:', JSON.stringify(discussionMap, null, 2));
