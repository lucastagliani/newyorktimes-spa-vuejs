<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <img alt="NYT logo" src="../assets/logo.png" />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-if="!hasSectionsToDisplay()">
          <NoDataToDisplay :message="'There is no articles here today.'" />
        </div>
        <div v-if="hasSectionsToDisplay()" class="columns is-multiline">
          <div
            v-for="(item, index) in sections"
            :key="item[index]"
            class="column is-3-widescreen is-6"
          >
            <SectionCard
              :name="item.name"
              :icon="item.icon"
              :title="item.title"
              :description="item.description"
            ></SectionCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NoDataToDisplay from '@/components/NoDataToDisplay.vue';
import SectionCard from '@/components/SectionCard.vue';

import sectionService from '@/services/sectionService';

export default {
  name: 'home',
  components: {
    NoDataToDisplay,
    SectionCard,
  },
  data() {
    return {
      sections: [],
    };
  },
  async mounted() {
    window.mixpanel.track('Load home');
    this.sections = sectionService.getSections();
  },
  methods: {
    hasSectionsToDisplay() {
      return this.sections && this.sections.length > 0;
    },
  },
};
</script>
