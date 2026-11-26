import test from 'node:test';
import assert from 'node:assert/strict';
import {parseTrending, isDuplicate, remainingToday, findReadmeImage, isValidRepo} from './collect.mjs';

test('accepts a valid ranked JSON-LD item list and fails when source changes', () => {
  const item = (name, position) => ({position, item: {name, codeRepository: `https://github.com/${name}`}});
  const html = `<script type="application/ld+json">${JSON.stringify({'@type': 'ItemList', itemListElement: [item('two/repo', 2), item('one/repo', 1)]})}</script>`;
  assert.deepEqual(parseTrending(html).map(repo => repo.name), ['one/repo', 'two/repo']);
  assert.throws(() => parseTrending('<html></html>'), /ItemList/);
  assert.throws(() => parseTrending('<script type="application/ld+json">{"@type":"ItemList","itemListElement":[]}</script>'), /empty/i);
});

test('deduplicates by stable GitHub ID or normalized legacy name and URL', () => {
  const data = {seen: [{repoFullName:'Owner/Old'}], posts: [{repoId: 123, repoName:'Owner/Renamed', githubUrl:'https://github.com/Owner/Renamed'}]};
  assert.ok(isDuplicate(data, {id:123, full_name:'Owner/New', html_url:'https://github.com/Owner/New'}));
  assert.ok(isDuplicate(data, {id:456, full_name:'OWNER/OLD', html_url:'https://github.com/OWNER/OLD/'}));
  assert.ok(isDuplicate(data, {id:456, full_name:'other/repo', html_url:'https://github.com/owner/renamed.git/'}));
  assert.equal(isDuplicate(data, {id:456, full_name:'other/repo', html_url:'https://github.com/other/repo'}), false);
});

test('counts only successful collections on the requested local date', () => {
  assert.equal(remainingToday({posts:[{collectedOn:'2026-11-26'}, {collectedOn:'2026-11-25'}, {}]}, '2026-11-26', 2), 1);
  assert.equal(remainingToday({posts:[{collectedOn:'2026-11-26'}, {collectedOn:'2026-11-26'}]}, '2026-11-26', 2), 0);
});

test('selects a repository image and ignores badges and unrelated image hosts', () => {
  const readme = '![badge](https://img.shields.io/test.svg)\n![banner](assets/banner.png)';
  assert.equal(findReadmeImage(readme, 'owner/repo', 'main'), 'https://raw.githubusercontent.com/owner/repo/main/assets/banner.png');
  assert.equal(findReadmeImage('![x](https://evil.example/x.png)', 'owner/repo', 'main'), null);
});

test('accepts only matching canonical HTTPS GitHub repository URLs', () => {
  assert.ok(isValidRepo({id:123, full_name:'Owner/Repo', html_url:'https://github.com/Owner/Repo'}));
  assert.equal(isValidRepo({id:123, full_name:'Owner/Repo', html_url:'https://evil.example/Owner/Repo'}), false);
  assert.equal(isValidRepo({id:123, full_name:'Owner/Repo', html_url:'http://github.com/Owner/Repo'}), false);
  assert.equal(isValidRepo({id:123, full_name:'Owner/Repo', html_url:'https://github.com/other/repo'}), false);
  assert.equal(isValidRepo({id:123, full_name:'Owner/..', html_url:'https://github.com/Owner/..'}), false);
});
