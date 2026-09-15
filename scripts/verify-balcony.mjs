import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { storyProgress, messageOpacity, filmTime } from '../src/scripts/balcony-timeline.ts';

for (const [track, screen] of [[3600, 900], [3038.4, 844]]) {
  assert.equal(storyProgress(200, track, screen), 0);
  assert.equal(storyProgress(-(track - screen) / 2, track, screen), .5);
  assert.equal(storyProgress(-(track - screen), track, screen), 1,
    'The last frame must coincide with the end of the sticky range');
  assert.equal(storyProgress(-track, track, screen), 1);
  const values = [0, .3, .65, .85, 1];
  const forward = values.map(p => filmTime(storyProgress(-p * (track - screen), track, screen), 8));
  const backward = [...values].reverse().map(p => filmTime(storyProgress(-p * (track - screen), track, screen), 8)).reverse();
  assert.deepEqual(forward, backward, 'Scroll reversal must restore matching frames');
}
assert.equal(filmTime(0, 8), 0);
assert.ok(filmTime(1, 8) < 8 && filmTime(1, 8) >= 7.95);
assert.equal(messageOpacity(0, 0), 1);
assert.equal(messageOpacity(.4, 1), 1);
assert.equal(messageOpacity(.85, 2), 1, 'Closing copy must be readable before the last frame');
assert.deepEqual([0,1,2].map(i => messageOpacity(.65, i)), [0,0,0], 'Keep the passage clear of headlines');
for (let p = 0; p <= 1; p += .005) {
  const values = [0,1,2].map(i => messageOpacity(p, i));
  assert.ok(values.every(v => v >= 0 && v <= 1));
  assert.ok(values.filter(v => v > .1).length <= 1, 'Headlines must never overlap');
}
const html = readFileSync('dist/index.html', 'utf8');
assert.match(html, /sacada-scroll-v1\.mp4/);
assert.match(html, /sacada-scroll-poster-v1\.jpg/);
assert.match(html, /Role para abrir|Uma nova forma de/);
assert.ok(!html.includes('data-balcony-pane'), 'CSS glass panels must not overlay the supplied film');
console.log('Vídeo: sincronização, reversão, textos sem sobreposição, saída e fallback estático aprovados.');
