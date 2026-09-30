<script setup lang="ts">
const items = [
  { label: 'When', value: 'Sat Oct 3 · doors 9:30 AM · kickoff 10:30 AM · building from 11:00 AM' },
  { label: 'Where', value: 'GW Science & Engineering Hall, 800 22nd St NW' },
  { label: 'Arrival', value: 'Enter at 22nd & H St. Volunteers will meet you and provide building access.' },
  { label: 'Included', value: 'Lunch and coffee' },
  { label: 'Bring', value: 'Laptop, phone, pen or pencil, and a clipboard if you have one' }
]
</script>

<template>
  <section class="event-info" aria-label="Event details">
    <dl>
      <div v-for="item in items" :key="item.label">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.event-info { max-width: 1152px; margin: 0 auto; padding: 8px 24px 32px; }
dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-divider);
}
dl > div { background: var(--vp-c-bg); padding: 16px 20px; }
dt { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--vp-c-brand-1); }
dd { margin: 4px 0 0; font-size: 14px; line-height: 1.5; color: var(--vp-c-text-1); }
</style>
