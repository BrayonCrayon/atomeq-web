<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as d3 from 'd3';
import AtomeqBackgroundElements from '@/views/home/AtomeqBackgroundElements.vue';

interface IElementsWithDepth {
  element:
    | d3.Selection<SVGGElement, unknown, null, undefined>
    | d3.Selection<SVGElement, unknown, null, undefined>;
  z: number;
}

// D3 Atom visualization
const atomContainer = ref<HTMLElement | null>(null);
let atomTimer: d3.Timer | null = null;
const atomRotation = { x: 0, y: 0, z: 0 };
const atomSize = 200;

// Helper function to project 3D point to 2D (define early)
const project3D = (x: number, y: number, z: number, perspective: number = 500) => {
  const scale = perspective / (perspective + z);
  return { x: x * scale, y: y * scale, scale };
};

// Initialize D3 atom visualization
const initD3Atom = () => {
  if (!atomContainer.value) return;

  const container = d3.select(atomContainer.value);
  container.selectAll('*').remove();

  // Increase viewBox to prevent clipping (largest radius is 100, add padding)
  const padding = 50;
  const viewBoxSize = atomSize + padding * 2;

  const svg = container
    .append('svg')
    .attr('width', atomSize)
    .attr('height', atomSize)
    .attr('viewBox', `${-padding} ${-padding} ${viewBoxSize} ${viewBoxSize}`);

  const centerX = atomSize / 2;
  const centerY = atomSize / 2;
  const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

  // Define gradients and filters
  const defs = svg.append('defs');

  // Nucleus gradient
  const nucleusGradient = defs
    .append('radialGradient')
    .attr('id', 'nucleusGradient')
    .attr('cx', '30%')
    .attr('cy', '30%');
  nucleusGradient.append('stop').attr('offset', '0%').attr('stop-color', '#a5b4fc');
  nucleusGradient.append('stop').attr('offset', '50%').attr('stop-color', '#6366f1');
  nucleusGradient.append('stop').attr('offset', '100%').attr('stop-color', '#4f46e5');

  // Inner nucleus gradient
  const nucleusInnerGradient = defs
    .append('radialGradient')
    .attr('id', 'nucleusInnerGradient')
    .attr('cx', '40%')
    .attr('cy', '40%');
  nucleusInnerGradient.append('stop').attr('offset', '0%').attr('stop-color', '#c7d2fe');
  nucleusInnerGradient.append('stop').attr('offset', '100%').attr('stop-color', '#818cf8');

  // Glow filters
  const glowFilter = defs.append('filter').attr('id', 'glow');
  glowFilter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
  const feMerge = glowFilter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'coloredBlur');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  // Electron glow filter
  const electronGlow = defs.append('filter').attr('id', 'electronGlow');
  electronGlow.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
  const electronFeMerge = electronGlow.append('feMerge');
  electronFeMerge.append('feMergeNode').attr('in', 'coloredBlur');
  electronFeMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  // Electron orbits configuration - moderate speeds for smooth animation
  const orbits = [
    {
      radius: 60,
      speed: 1.5, // degrees per second
      angle: 0,
      tiltX: 0,
      tiltY: 0,
      color: '#60a5fa',
      electronColor: '#3b82f6',
      electrons: 2, // Multiple electrons per orbit
    },
    {
      radius: 80,
      speed: -1.2, // opposite direction
      angle: 120,
      tiltX: 60,
      tiltY: 0,
      color: '#a78bfa',
      electronColor: '#8b5cf6',
      electrons: 2,
    },
    {
      radius: 100,
      speed: 1.0,
      angle: 240,
      tiltX: 0,
      tiltY: 60,
      color: '#c084fc',
      electronColor: '#a855f7',
      electrons: 2,
    },
  ];

  // Create orbit paths and electrons
  const orbitGroups = g
    .selectAll('.orbit-group')
    .data(orbits)
    .enter()
    .append('g')
    .attr('class', 'orbit-group');

  // Orbit paths - create path elements (will be updated in animation to rotate with atom)
  orbitGroups.each(function (d, orbitIndex) {
    const orbitGroup = d3.select(this);
    orbitGroup
      .append('path')
      .attr('class', `orbit-path-${orbitIndex}`)
      .attr('fill', 'none')
      .attr('stroke', d.color)
      .attr('stroke-width', 2.5)
      .attr('stroke-opacity', 0.4);
  });

  // Create electron gradients for sphere effect
  orbits.forEach((orbit, orbitIndex) => {
    const electronGradient = defs
      .append('radialGradient')
      .attr('id', `electronGradient-${orbitIndex}`)
      .attr('cx', '35%')
      .attr('cy', '35%');
    electronGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffffff');
    electronGradient.append('stop').attr('offset', '50%').attr('stop-color', orbit.electronColor);
    electronGradient.append('stop').attr('offset', '100%').attr('stop-color', orbit.color);
  });

  // Create multiple electrons per orbit with sphere-like appearance
  orbitGroups.each(function (d, orbitIndex) {
    const orbitGroup = d3.select(this);
    for (let i = 0; i < d.electrons; i++) {
      const electronGroup = orbitGroup.append('g').attr('class', `electron-${i}`);

      // Outer glow
      electronGroup
        .append('circle')
        .attr('r', 8)
        .attr('fill', d.electronColor)
        .attr('opacity', 0.3)
        .attr('filter', 'url(#electronGlow)');

      // Main sphere with gradient
      electronGroup
        .append('circle')
        .attr('r', 6)
        .attr('fill', `url(#electronGradient-${orbitIndex})`)
        .attr('filter', 'url(#electronGlow)')
        .style('opacity', 1);
    }
  });

  // Nucleus (centered) - make it more prominent, will be reordered by z-depth
  const nucleusGroup: d3.Selection<SVGGElement, unknown, null, undefined> = g
    .append('g')
    .attr('class', 'nucleus-group')
    .attr('data-z', '0');
  nucleusGroup
    .append('circle')
    .attr('r', 16)
    .attr('fill', 'url(#nucleusGradient)')
    .attr('filter', 'url(#glow)')
    .style('opacity', 1);

  // Add inner glow to nucleus
  nucleusGroup
    .append('circle')
    .attr('r', 10)
    .attr('fill', 'url(#nucleusInnerGradient)')
    .style('opacity', 0.8);

  // Helper function to rotate point around axis
  const rotate3D = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const cosZ = Math.cos(rz);
    const sinZ = Math.sin(rz);

    // Rotate around X
    let newY = y * cosX - z * sinX;
    let newZ = y * sinX + z * cosX;
    let newX = x;

    // Rotate around Y
    x = newX * cosY + newZ * sinY;
    z = -newX * sinY + newZ * cosY;
    y = newY;

    // Rotate around Z
    newX = x * cosZ - y * sinZ;
    newY = x * sinZ + y * cosZ;
    newZ = z;

    return { x: newX, y: newY, z: newZ };
  };

  // Animation using D3 timer - much slower and smoother
  atomTimer = d3.timer((elapsed) => {
    const time = elapsed * 0.001; // Convert to seconds

    // Update overall atom rotation (moderate speed - full rotation in ~20 seconds)
    atomRotation.y = ((time * 18) % 360) * (Math.PI / 180); // 18 degrees per second
    atomRotation.x = ((time * 12) % 360) * (Math.PI / 180); // 12 degrees per second

    // Store elements with their z-depths for sorting
    const elementsWithDepth: IElementsWithDepth[] = [];
    const electronElements: {
      element: d3.Selection<d3.BaseType, unknown, null, undefined>;
      z: number;
    }[] = [];

    // Update each orbit group - update both paths and electrons (both rotate with atom)
    orbitGroups.each(function (d) {
      const orbitGroup = d3.select(this);
      const orbitPath: d3.Selection<SVGElement, unknown, null, undefined> =
        orbitGroup.select('path');
      const electronGroups = orbitGroup.selectAll('g[class^="electron"]');

      // Apply orbit plane tilt
      const tiltXRad = (d.tiltX * Math.PI) / 180;
      const tiltYRad = (d.tiltY * Math.PI) / 180;

      // Helper function to transform point (used for both paths and electrons)
      const transformOrbitPoint = (px: number, py: number, pz: number = 0) => {
        // Apply orbit plane tilt
        let px3d = px;
        const py3d = py * Math.cos(tiltXRad) - pz * Math.sin(tiltXRad);
        let pz3d = py * Math.sin(tiltXRad) + pz * Math.cos(tiltXRad);

        const tempPx = px3d * Math.cos(tiltYRad) + pz3d * Math.sin(tiltYRad);
        pz3d = -px3d * Math.sin(tiltYRad) + pz3d * Math.cos(tiltYRad);
        px3d = tempPx;

        // Apply global atom rotation (both paths and electrons rotate together)
        return rotate3D(px3d, py3d, pz3d, atomRotation.x, atomRotation.y, 0);
      };

      // Update orbit path - generate path from orbit shape (rotates with atom)
      const pathPoints: Array<{ x: number; y: number }> = [];
      const zDepths: number[] = [];
      const numPoints = 64;

      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const px = Math.cos(angle) * d.radius;
        const py = Math.sin(angle) * d.radius;

        const rotated = transformOrbitPoint(px, py, 0);
        const projected = project3D(rotated.x, rotated.y, rotated.z, 400);
        pathPoints.push({ x: projected.x, y: projected.y });
        zDepths.push(rotated.z);
      }

      const avgPathZ = zDepths.reduce((sum, z) => sum + z, 0) / zDepths.length;

      const pathData =
        d3
          .line<{ x: number; y: number }>()
          .x((p) => p.x)
          .y((p) => p.y)
          .curve(d3.curveLinear)(pathPoints) || '';

      orbitPath.attr('d', pathData);

      // Store orbit path with its z-depth
      elementsWithDepth.push({ element: orbitPath, z: avgPathZ });

      // Update electrons - position them evenly around the orbit (using same transform as path)
      electronGroups.each(function (_, electronIndex) {
        const electronGroup = d3.select(this);
        const electronAngleDeg =
          (d.angle + time * d.speed + (electronIndex * 360) / d.electrons) % 360;
        const electronAngle = (electronAngleDeg * Math.PI) / 180;

        // Position on the orbit plane
        const electronX = Math.cos(electronAngle) * d.radius;
        const electronY = Math.sin(electronAngle) * d.radius;

        // Transform electron position to 3D and project (same function as path - they rotate together)
        const electronRotated = transformOrbitPoint(electronX, electronY, 0);
        const electronProjected = project3D(
          electronRotated.x,
          electronRotated.y,
          electronRotated.z,
          400,
        );

        // Update electron with depth-based scaling and opacity
        const electronScale = Math.max(0.75, Math.min(1.0, electronProjected.scale));
        const electronOpacity = Math.max(0.8, Math.min(1.0, electronProjected.scale));

        // Update both circles in the electron group
        electronGroup
          .attr(
            'transform',
            `translate(${electronProjected.x}, ${electronProjected.y}) scale(${electronScale})`,
          )
          .style('opacity', electronOpacity);

        // Store electron with its z-depth
        electronElements.push({ element: electronGroup, z: electronRotated.z });
      });
    });

    // Add nucleus at the end (z = 0, center)
    elementsWithDepth.push({ element: nucleusGroup, z: 0 });

    // Sort elements by z-depth (back to front) - negative z (behind) first, then nucleus (0), then positive z (front)
    elementsWithDepth.sort((a, b) => a.z - b.z);

    // Reorder elements in the DOM (SVG renders in order - later elements appear on top)
    // appendChild automatically moves nodes if they're already in the DOM, preserving D3 selections
    const parentNode = g.node();
    if (parentNode) {
      elementsWithDepth.forEach((item) => {
        const node = item.element.node();
        if (node && node.parentNode === parentNode) {
          // appendChild moves the node to the end if it's already a child
          parentNode.appendChild(node);
        }
      });
      electronElements.forEach((item) => {
        const node = item.element.node();
        if (node && 'parentNode' in node && node.parentNode === parentNode) {
          // appendChild moves the node to the end if it's already a child
          parentNode.appendChild(node);
        }
      });
    }
  });
};

onMounted(async () => {
  // Initialize D3 atom
  initD3Atom();
});

onUnmounted(() => {
  if (atomTimer) {
    atomTimer.stop();
  }
});
</script>

<template>
  <main class="relative overflow-hidden flex flex-col h-full">
    <AtomeqBackgroundElements />

    <!-- Main Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center">
      <div class="max-w-2xl mx-auto text-center space-y-2">
        <!-- 3D Atom Model (D3) -->
        <div class="flex justify-center">
          <div ref="atomContainer" class="atom-d3-container"></div>
        </div>

        <!-- Project Title -->
        <h1 class="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
          Building Knowledge, One Atom at a Time
        </h1>

        <!-- Project Description Card -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-4 text-lg md:text-xl text-slate-700"
        >
          <p>
            Welcome to <strong>Atomeq</strong>, an interactive periodic table application that
            brings chemistry to life.
          </p>
          <p>
            Explore the elements, discover their properties, and visualize the building blocks of
            our universe through an intuitive and engaging interface.
          </p>
          <p class="text-base md:text-lg text-slate-600 mt-6">
            Navigate through the periodic table, view detailed element information, and use our
            powerful Formulator 9000 tool to explore chemical compounds.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* D3 Atom Container */
.atom-d3-container {
  width: 200px;
  height: 200px;
  position: relative;
}

.atom-d3-container svg {
  width: 100%;
  height: 100%;
}
</style>
