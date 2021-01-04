<template>
  <div>
    <videowrap :options="options"></videowrap>
    <!-- <videowrap :options='options'></videowrap>
    <videowrap :options='options'></videowrap>-->
  </div>
</template>

<script>
import videowrap from "@/components/common/video";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    videowrap,
  },
  mounted() {
    let data = JSON.parse(window.atob(this.$route.query.data));
    console.log(data);
  
      this.options = Object.assign(
        {},
        {
          sources: [
            {
              type: "video/mp4",
              src: data.filePath, //"http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"//
            },
          ],
          poster: data.extFilePath, //"http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg ",
        }
      );
 
  },
  methods: {},
};
</script>

<style>
</style>
