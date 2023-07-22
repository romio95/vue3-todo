<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-logo">
        <Icon name="rocket"></Icon>
      </div>
      <div class="home-action">
        <a href="#" class="home-action__btn" @click.prevent="openModal">
          Add item
          <Icon name="plus"></Icon>
        </a>
      </div>
      <div class="home-content">
        <TODOList
          :list="list"
          :allItemsCount="allItemsCount"
          :finishedItemsCount="finishedItemsCount"
          @remove="removeItem($event)"
          @change="changeItem($event)"
        />
      </div>
    </div>
    <Teleport to="body">
      <AddItem
        :isShowCreateModal="isShowCreateModal"
        @close="closeModal"
        @add="createItem($event)"
      />
    </Teleport>
  </div>
</template>

<script setup>
import Icon from "@/components/atoms/Icon.vue";
import TODOList from "@/components/TODOList.vue";
import AddItem from "@/components/modals/AddItem.vue";
import { ref, computed, onMounted } from "vue";

const list = ref([]);
const isShowCreateModal = ref(false);

const allItemsCount = computed(() => {
  return list.value.length;
});
const finishedItemsCount = computed(() => {
  let filteredList = list.value.filter((item) => item.finished);
  return filteredList.length;
});

onMounted(() => {
  setList();
});

const openModal = () => {
  isShowCreateModal.value = true;
};
const closeModal = () => {
  isShowCreateModal.value = false;
};

const createItem = ($event) => {
  list.value.unshift($event);
  updateList();
};

const removeItem = ($event) => {
  const itemIndex = list.value.findIndex((item) => item.id === $event);
  if (itemIndex !== -1) {
    list.value.splice(itemIndex, 1);
    updateList();
  }
};

const changeItem = (itemId) => {
  const itemIndex = list.value.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    const item = list.value[itemIndex];
    item.finished = !item.finished;
    updateList();
  }
};

const updateList = () => {
  if (list.value && list.value.length) {
    localStorage.setItem("todo", JSON.stringify(list.value));
  } else {
    localStorage.removeItem("todo");
  }
};

const setList = () => {
  if (localStorage.getItem("todo")) {
    list.value = JSON.parse(localStorage.getItem("todo"));
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(180deg, #0d0d0d 30%, #1a1a1a 20%);
  &-logo {
    padding: 110px 0 40px;
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
  &-action {
    width: 100%;
    text-align: center;
    margin-bottom: 80px;
    a {
      display: inline-block;
      margin: 0 auto;
      text-decoration: none;
      padding: 16px;
      border-radius: 8px;
      background: #1e6f9f;
      color: #f2f2f2;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      transition: background $trans;
      i {
        display: inline;
        vertical-align: middle;
        margin-left: 10px;
      }
      &:hover {
        background: #8284fa;
      }
    }
  }
}
</style>
