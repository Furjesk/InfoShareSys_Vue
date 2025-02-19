<template>
  <div>
    <MyVideo @renewSetInfo="getVideoSetInfo()"/>
  </div>
</template>

<script>
import MyVideo from "@/pages/Play/Video"
import { mapGetters } from "vuex";
export default {
    name: "Play",
    components: {
        MyVideo
    },
    mounted() {
      this.getVideoSetInfo();
    },
    methods: {
      getVideoSetInfo(){
        let params = {
          userId: this.userid,
          setId: this.$route.params.setId,
        }
        this.$store.dispatch("getVideoSetInfo",params);
      }
    },
    computed: {
      ...mapGetters(['userid'])
    }
}
</script>

<style>

</style>