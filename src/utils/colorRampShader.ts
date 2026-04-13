// Color ramp / palette swap shader for Excalibur.js (WebGL)
//
// Replaces up to 8 colors in a sprite with alternate colors. Each pixel is
// compared against an array of "original" colors; when the Euclidean distance
// in RGBA space falls within a tolerance the pixel is rewritten to the
// corresponding "replacement" color. This is the standard palette-swap
// technique used by the Mana Seed sprite system to recolor clothing, hair,
// and skin from a single base sheet.
//
// Usage:
//   const material = createColorRampMaterial(engine.graphicsContext);
//   material.update((shader) => {
//     shader.setUniformFloatArray('u_original_colors', originalColorsFloat32);
//     shader.setUniformFloatArray('u_replace_colors', replaceColorsFloat32);
//   });
//   actor.graphics.material = material;
//
// Each color array is a Float32Array of 32 floats (8 colors × 4 components),
// with components normalized to 0–1. Use colorsToFloat32Array() to convert
// an array of Excalibur Colors.

import { Color } from 'excalibur';
import type { ExcaliburGraphicsContext, Material } from 'excalibur';

// Number of palette slots the shader supports
const PALETTE_SIZE = 8;

// How close (Euclidean distance in 0–1 RGBA space) a pixel must be to an
// original color to trigger replacement. 0.1 tolerates minor compression
// artifacts without false-positives on neighboring ramp entries.
const COLOR_MATCH_PRECISION = 0.1;

const COLOR_RAMP_FRAGMENT_SOURCE = `#version 300 es
precision mediump float;

// Excalibur built-in varyings and uniforms
in vec2 v_uv;
uniform sampler2D u_graphic;
uniform float u_opacity;

// Palette swap uniforms — 8 RGBA slots each, components in 0–1 range.
// Packed as vec4 arrays so the CPU side can upload a single Float32Array.
uniform vec4 u_original_colors[${PALETTE_SIZE}];
uniform vec4 u_replace_colors[${PALETTE_SIZE}];

out vec4 fragColor;

void main() {
  vec4 texColor = texture(u_graphic, v_uv);

  // Skip fully transparent pixels — nothing to swap
  if (texColor.a < 0.01) {
    fragColor = texColor;
    return;
  }

  // un-premultiply alpha so the distance check works on straight RGBA
  // (Excalibur pre-multiplies alpha in its pipeline)
  vec4 straight = vec4(texColor.rgb / texColor.a, texColor.a);

  for (int i = 0; i < ${PALETTE_SIZE}; i++) {
    if (distance(straight, u_original_colors[i]) <= ${COLOR_MATCH_PRECISION.toFixed(4)}) {
      // Re-premultiply the replacement color before output
      vec4 replaced = u_replace_colors[i];
      fragColor = vec4(replaced.rgb * replaced.a, replaced.a) * u_opacity;
      return;
    }
  }

  // No match — pass through the original (already pre-multiplied)
  fragColor = texColor * u_opacity;
}
`;

// Converts an array of up to 8 Excalibur Colors into a flat Float32Array
// suitable for uploading as a vec4[] uniform. Unused slots are filled with
// fully-transparent black so they never match a visible pixel.
function colorsToFloat32Array(colors: readonly Color[]): Float32Array {
  const buffer = new Float32Array(PALETTE_SIZE * 4);
  const count = Math.min(colors.length, PALETTE_SIZE);

  for (let i = 0; i < count; i++) {
    const offset = i * 4;
    // Color stores r/g/b in 0–255 and a in 0–1
    buffer[offset] = colors[i].r / 255;
    buffer[offset + 1] = colors[i].g / 255;
    buffer[offset + 2] = colors[i].b / 255;
    buffer[offset + 3] = colors[i].a;
  }

  return buffer;
}

// Creates an Excalibur Material that performs palette-swap rendering.
// Call material.update() to set the uniform color arrays before use.
function createColorRampMaterial(graphicsContext: ExcaliburGraphicsContext): Material {
  return graphicsContext.createMaterial({
    name: 'color-ramp',
    fragmentSource: COLOR_RAMP_FRAGMENT_SOURCE,
  });
}

export {
  COLOR_RAMP_FRAGMENT_SOURCE,
  PALETTE_SIZE,
  colorsToFloat32Array,
  createColorRampMaterial,
};
