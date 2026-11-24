<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from 'vue'
import { categories } from './data/shortcuts'

type Theme = 'dark' | 'light'

function loadTheme(): Theme {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

const active = ref(categories[0]!.id)
const query = ref('')
const theme = ref<Theme>(loadTheme())

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {
    /* ignore */
  }
})

const lit = ref<Set<string>>(new Set())
const litTimers = new Map<string, ReturnType<typeof setTimeout>>()

function setLit(id: string, on: boolean) {
  const next = new Set(lit.value)
  if (on) next.add(id)
  else next.delete(id)
  lit.value = next
}

// Each row fades on its own timer, so several can be lit at once.
// Remove then re-add the class so the fade restarts when the same row is clicked again.
async function flash(id: string) {
  clearTimeout(litTimers.get(id))
  setLit(id, false)
  await nextTick()
  setLit(id, true)
  litTimers.set(id, setTimeout(() => setLit(id, false), 1600))
}

const current = computed(() => categories.find((c) => c.id === active.value)!)

const groups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return current.value.groups
  return current.value.groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => i.desc.toLowerCase().includes(q) || i.keys.some((k) => k.toLowerCase().includes(q)),
      ),
    }))
    .filter((g) => g.items.length)
})
</script>

<template>
  <header>
    <h1>Neovim <span>LazyVim cheatsheet</span></h1>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'">
      {{ theme === 'dark' ? '☀ Light' : '☾ Dark' }}
    </button>
  </header>

  <nav>
    <button
      v-for="c in categories"
      :key="c.id"
      :class="{ on: c.id === active }"
      @click="active = c.id"
    >
      {{ c.label }}
    </button>
    <input v-model="query" type="search" placeholder="Filter this tab…" />
  </nav>

  <main>
    <p v-if="current.note" class="note">{{ current.note }}</p>
    <template v-if="!query.trim() && current.concepts">
      <article v-for="c in current.concepts" :key="c.title" class="concept">
        <h3>{{ c.title }}</h3>
        <p>{{ c.text }}</p>
        <pre v-if="c.ascii">{{ c.ascii }}</pre>
      </article>
    </template>
    <p v-if="!groups.length" class="note">No matches.</p>
    <section v-for="g in groups" :key="g.title">
      <h2>{{ g.title }}</h2>
      <div
        v-for="(s, i) in g.items"
        :key="i"
        class="row"
        :class="{ lit: lit.has(`${active}:${g.title}:${i}`) }"
        tabindex="0"
        role="button"
        @click="flash(`${active}:${g.title}:${i}`)"
        @keydown.enter.space.prevent="flash(`${active}:${g.title}:${i}`)"
      >
        <span class="keys">
          <template v-for="(alt, ai) in s.keys" :key="ai">
            <span v-if="ai" class="sep">/</span>
            <span class="combo">
              <kbd v-for="(tok, ti) in alt.split(' ')" :key="ti">{{ tok }}</kbd>
            </span>
          </template>
        </span>
        <span class="desc">
          {{ s.desc }}
          <em v-if="s.mode">{{ s.mode }}</em>
        </span>
      </div>
    </section>
  </main>
</template>
