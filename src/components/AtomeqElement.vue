<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';
import { onMounted, onUnmounted, ref } from 'vue';

defineProps<{
  element: AtomeqElement;
}>();

const card = ref<HTMLElement | null>(null);
let rafId = 0;

const clamp = (v: number, a = -1, b = 1) => Math.max(a, Math.min(b, v));

const maxRotateX = 20; // degrees (tilt up/down)
const maxRotateY = 20; // degrees (tilt left/right)

const applyTransform = (rotX: number, rotY: number) => {
  if (!card.value) return;
  // larger perspective looks nicer; adjust translateZ to taste
  card.value.style.transform = `perspective(400px) translateZ(35px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.50)`;
};

const cardMove = (e: MouseEvent) => {
  if (!card.value) return;

  const rect = card.value.getBoundingClientRect();

  // mouse position relative to top-left of element
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  // normalize to -1 .. +1
  // when mouse at left edge => px = -1, right edge => +1
  const px = clamp((offsetX / rect.width) * 2 - 1);
  // when mouse at top => py = -1, bottom => +1
  const py = clamp((offsetY / rect.height) * 2 - 1);

  // map normalized coords to angles
  // rotateX should respond to vertical movement (py) and typically invert (move up => tilt toward viewer)
  const rotateX = -py * maxRotateX;
  // rotateY should respond to horizontal movement (px)
  const rotateY = px * maxRotateY;

  // throttle via rAF
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    applyTransform(rotateX, rotateY);
    rafId = 0;
  });
};

const resetCard = (): void => {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  if (card.value) {
    card.value.style.transform = '';
    // optionally smooth reset
    // card.value.style.transition = 'transform 180ms ease';
    // setTimeout(() => (card.value!.style.transition = ''), 200);
  }
};

onMounted(() => {
  card.value?.addEventListener('mousemove', cardMove);
  card.value?.addEventListener('mouseleave', resetCard);
});

onUnmounted(() => {
  card.value?.removeEventListener('mousemove', cardMove);
  card.value?.removeEventListener('mouseleave', resetCard);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div ref="card" class="h-20 content-center">
    <div class="flex justify-between text-xs font-bold mb-2">
      <div>
        {{ element?.atomicNumber }}
      </div>
      <div>
        {{ element?.atomicMass }}
      </div>
    </div>
    <div class="justify-self-center text-lg font-bold">
      {{ element?.symbol }}
    </div>
    <div class="justify-self-center text-xs font-bold">
      {{ element?.name }}
    </div>
  </div>
</template>

<style scoped></style>
