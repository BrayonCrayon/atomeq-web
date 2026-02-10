<script setup lang="ts">
import type { Element } from '@/types/element.ts';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    element: Element;
    faded?: boolean;
  }>(),
  {
    faded: false,
  },
);

const card = ref<HTMLElement | null>(null);
let requestAnimationFrameId = 0;

const maxTiltX = 20;
const maxTiltY = 20;

const animationOffset = computed(() => {
  const sign = props.element.group === 1 ? '' : '-';
  return [1, 18].includes(props.element.group) ? `translateX(${sign}12px)` : '';
});

const maxFromRange = (v: number, a = -1, b = 1) => Math.max(a, Math.min(b, v));

const applyTransform = (rotX: number, rotY: number) => {
  if (!card.value) return;

  card.value.style.transform = `perspective(400px) translateZ(35px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.50) ${animationOffset.value}`;
};

const cardMove = (e: MouseEvent) => {
  if (!card.value) return;

  const boundingBox = card.value.getBoundingClientRect();

  const mousePositionX = e.clientX - boundingBox.left;
  const mousePositionY = e.clientY - boundingBox.top;

  const permittedX = maxFromRange((mousePositionX / boundingBox.width) * 2 - 1);
  const permittedY = maxFromRange((mousePositionY / boundingBox.height) * 2 - 1);

  const rotateX = -permittedX * maxTiltX;
  const rotateY = permittedY * maxTiltY;

  if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
  requestAnimationFrameId = requestAnimationFrame(() => {
    applyTransform(rotateX, rotateY);
    requestAnimationFrameId = 0;
  });
};

const resetCard = (): void => {
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = 0;
  }
  if (card.value) {
    card.value.style.transform = '';
  }
};

onMounted(() => {
  card.value?.addEventListener('mousemove', cardMove);
  card.value?.addEventListener('mouseleave', resetCard);
});

onUnmounted(() => {
  card.value?.removeEventListener('mousemove', cardMove);
  card.value?.removeEventListener('mouseleave', resetCard);
  if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
});

// TODO: Elements don't switch back when hovered on another type.
// TODO: Bug with faded, not accounting for undefined. Should always be false in this case
</script>
<template>
  <div
    ref="card"
    class="h-20 content-center bg-linear-to-b from-slate-100 to-transparent"
    :class="{
      ['faded']: faded,
    }"
  >
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

<style scoped lang="scss">
.faded {
  @apply hidden;
}
</style>
