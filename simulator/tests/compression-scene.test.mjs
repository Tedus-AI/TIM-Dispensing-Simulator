import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCompressionScene, rampColor } from '../src/compression-scene.js';

const near = (a, b, e = 1e-5) => assert.ok(Math.abs(a - b) < e, `${a} != ${b}`);
const grid = (extra) => ({ originX: 0, originY: 0, cellSize: 1, cols: 2, rows: 1, coverage: new Float32Array([0.25, 1]), ...extra });

test('heat source and transparent plate use the configured size, offset and gap', () => {
  const config = { surfaceZ: 13, material: 'putty' };
  const settings = { shape: 'rectangle', width: 30, depth: 20, offsetX: 5, offsetY: -8, gap: 0.2 };
  const scene = createCompressionScene(config, settings, { grid: grid() });
  scene.group.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene.source).getSize(new THREE.Vector3());
  near(size.x, 30);
  near(size.y, 20);
  near(scene.source.position.x, 5);
  near(scene.source.position.y, -8);
  const plate = new THREE.Box3().setFromObject(scene.plate);
  near(plate.min.z, 13.2);
  near(plate.getSize(new THREE.Vector3()).z, 3);
  // The film never rises above the plate's lower face.
  scene.film.geometry.computeBoundingBox();
  assert.ok(scene.film.geometry.boundingBox.max.z <= 13.2 + 1e-6 && scene.film.geometry.boundingBox.max.z > 13);
  scene.dispose();
});

test('round heat source has true diameter, no film for zero coverage, and releases resources', () => {
  const scene = createCompressionScene(
    { surfaceZ: 2, material: 'grease' },
    { shape: 'circle', width: 20, depth: 3, offsetX: 0, offsetY: 0, gap: 1 },
    { grid: { originX: 0, originY: 0, cellSize: 1, cols: 1, rows: 1, coverage: [0] } },
  );
  const size = new THREE.Box3().setFromObject(scene.source).getSize(new THREE.Vector3());
  near(size.x, 20);
  near(size.y, 20);
  assert.equal(scene.film.geometry.getAttribute('position').count, 0);
  let count = 0;
  scene.plate.geometry.addEventListener('dispose', () => count++);
  scene.plate.material.addEventListener('dispose', () => count++);
  scene.dispose();
  assert.equal(count, 2);
});

test('inspection plate extends beyond all estimated material and the heat source', () => {
  const settings = { shape: 'rectangle', width: 10, depth: 10, offsetX: 0, offsetY: 0, gap: 0.2 };
  const scene = createCompressionScene({ surfaceZ: 0, material: 'putty' }, settings, { grid: { originX: 17, originY: -22, cellSize: 2, cols: 1, rows: 1, coverage: [1] } });
  scene.group.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene.plate);
  near(box.min.x, -11);
  near(box.max.x, 25);
  near(box.min.y, -28);
  near(box.max.y, 11);
  scene.dispose();
});

test('squeeze frames move the plate and draw trapped air', () => {
  const frames = [
    { gap: 1, coverage: Uint8Array.from([255, 0]), trapped: Uint8Array.from([0, 0]) },
    { gap: 0.5, coverage: Uint8Array.from([255, 0]), trapped: Uint8Array.from([0, 1]) },
  ];
  const scene = createCompressionScene({ surfaceZ: 0, material: 'putty' }, { shape: 'rectangle', width: 4, depth: 4, offsetX: 0, offsetY: 0, gap: 0.5 }, { grid: grid({ frames }) });
  assert.equal(scene.frameCount, 2);
  scene.setFrame(0);
  scene.group.updateMatrixWorld(true);
  near(new THREE.Box3().setFromObject(scene.plate).min.z, 1);
  assert.equal(scene.voids.geometry.getAttribute('position').count, 0);
  scene.setFrame(1);
  assert.equal(scene.voids.geometry.getAttribute('position').count, 6);
  scene.setColorMode('front');
  for (const v of scene.film.geometry.getAttribute('color').array) assert.ok(Number.isFinite(v));
  scene.dispose();
  assert.deepEqual(rampColor(0), [0.16, 0.2, 0.55]);
});
