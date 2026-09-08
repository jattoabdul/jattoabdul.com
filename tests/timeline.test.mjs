import test from "node:test";
import assert from "node:assert/strict";
import { pose, chapterAt } from "../src/cinematic/timeline.js";
test("all four formations are reached in story order", () => {
  for (const mobile of [false, true]) {
    assert.equal(pose(0, mobile).morph, 0);
    assert.equal(pose(3, mobile).morph, 1);
    assert.equal(pose(4, mobile).morph, 2);
    assert.equal(pose(6, mobile).morph, 3);
    for (const p of [0, 3, 4, 6]) assert.equal(pose(p, mobile).explode, 0);
    assert.equal(pose(2.3, mobile).explode, 1);
  }
});
test("scroll poses are finite, bounded and continuous through every transition", () => {
  for (const mobile of [false, true]) {
    let previous = pose(0, mobile);
    for (let p = 0.001; p <= 7; p += 0.001) {
      const current = pose(p, mobile);
      for (const [key, value] of Object.entries(current)) {
        assert.ok(Number.isFinite(value), `${key} at ${p}`);
        assert.ok(
          Math.abs(value - previous[key]) < 0.08,
          `${key} discontinuity at ${p}`,
        );
      }
      assert.ok(current.morph >= 0 && current.morph <= 3);
      assert.ok(current.explode >= 0 && current.explode <= 1);
      previous = current;
    }
  }
});
test("chapter progress holds at chapter end across intentional layout gaps", () => {
  const sections = [
    { top: 0, height: 720 },
    { top: 720, height: 1000 },
    { top: 2100, height: 720 },
  ];
  assert.equal(chapterAt(0, sections), 0);
  assert.equal(chapterAt(360, sections), 0.5);
  assert.equal(chapterAt(720, sections), 1);
  assert.equal(chapterAt(1900, sections), 2);
  assert.equal(chapterAt(2100, sections), 2);
  assert.equal(chapterAt(2460, sections), 2.5);
});
