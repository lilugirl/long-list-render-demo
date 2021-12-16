<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  #container {
    height: 100vh;
    overflow: auto;
  }
  .sunshine {
    display: flex;
    padding: 10px;
  }

  img {
    width: 150px;
    height: 150px;
  }
</style>

<script setup lang="ts">
  import { onMounted, ref, computed } from "vue";

  const getList = () => {
    return new Promise((resolve, reject) => {
      const Ajax = new XMLHttpRequest();
      Ajax.open("GET", "http://localhost:8000");
      Ajax.send();
      Ajax.onreadystatechange = function () {
        if (Ajax.readyState == 4 && Ajax.status === 200) {
          resolve(JSON.parse(Ajax.responseText));
        }
      };
    });
  };

  const container = ref<HTMLElement>(); // container节点
  const blank = ref<HTMLElement>(); // blank节点
  const list = ref<any>([]); // 列表
  const page = ref(1); // 当前页数
  const limit = 200; // 一页展示
  // 最大页数
  const maxPage = computed(() => Math.ceil(list.value.length / limit));
  // 真实展示的列表
  const showList = computed(() => list.value.slice(0, page.value * limit));

  const handleScroll = () => {
    // 当前页数与最大页书的比较
    if (page.value > maxPage.value) return;
    const clientHeight = container.value?.clientHeight;
    const blankTop = blank.value?.getBoundingClientRect().top;
    if (clientHeight > blankTop) {
      // blank出现在试图，则当前页面加1
      page.value++;
    }
  };

  onMounted(async () => {
    const res = await getList();
    list.value = res;
  });
</script>

<template>
  <div id="container" ref="container" @scroll="handleScroll">
    <div class="sunshine" v-for="item in showList" :key="item.tid">
      <img :src="item.src" />
      <span>{{ item.text }}</span>
    </div>
    <div ref="blank"></div>
  </div>
</template>
