<template>
  <component :is="template" @shift="shiftTemplate" :shiftData="shiftData" :fromHome="true"></component>
</template>

<script>
import home from "./home";

export default {
  // components: {
  //   home
  // },
  data() {
    return {
      template: "home",
      shiftData: null
    };
  },
  methods: {
    shiftTemplate(templateName, shiftData) {
      this.template = templateName;
      this.shiftData = shiftData;
    }
  }
};
</script>

<style>
</style>
