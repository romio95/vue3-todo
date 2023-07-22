<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header__item">
        All <span>{{ allItemsCount }}</span>
      </div>
      <div class="list-header__item">
        Completed <span>{{ finishedItemsCount }}</span>
      </div>
    </div>
    <div class="list-content">
      <div class="list-wrap" v-if="list.length">
        <div
          class="list-item"
          v-for="item in list"
          :key="item.id"
          :class="{ finished: item.finished }"
        >
          <div class="list-item__progress" @click="changeItem(item.id)">
            <Icon name="started" v-if="!item.finished"></Icon>
            <Icon name="finished" v-else></Icon>
          </div>
          <div class="list-item__title" @click="showItemInfo(item)">
            {{ item.title }}
          </div>
          <div class="list-item__action">
            <a href="" @click.prevent="showRemoveModal(item)">
              <Icon name="delete"></Icon>
            </a>
          </div>
        </div>
      </div>
      <div class="list-empty" v-if="!list.length">
        <div class="list-empty__icon">
          <Icon name="empty"></Icon>
        </div>
        <div class="list-empty__title">
          You don't have tasks registered yet
          <span>Create tasks and organize your to-do items</span>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <InfoModal
      :isShowModal="isShowInfoModal"
      :item="infoItem"
      @close="closeInfoModal"
    />
  </Teleport>
  <Teleport to="body">
    <RemoveModal
      :isShowModal="isShowRemoveModal"
      :item="removedItem"
      @close="closeRemoveModal"
      @remove="removeItem($event)"
    />
  </Teleport>
</template>

<script setup>
import Icon from "@/components/atoms/Icon.vue";
import InfoModal from "@/components/modals/ItemInfo.vue";
import RemoveModal from "@/components/modals/RemoveItem.vue";

import { defineEmits, defineProps, ref, toRefs } from "vue";

const props = defineProps({
  list: {
    type: Array,
  },
  finishedItemsCount: {
    type: Number,
    default: 0,
  },
  allItemsCount: {
    type: Number,
    default: 0,
  },
});

const { list, finishedItemsCount, allItemsCount } = toRefs(props);

const emit = defineEmits(["remove", "change"]);
const isShowInfoModal = ref(false);
const isShowRemoveModal = ref(false);
const infoItem = ref({});
const removedItem = ref({});

const changeItem = (itemId) => {
  emit("change", itemId);
}

const showItemInfo = (item) => {
  infoItem.value = item;
  isShowInfoModal.value = true;
};
const closeInfoModal = () => {
  infoItem.value = {};
  isShowInfoModal.value = false;
};

const showRemoveModal = (item) => {
  removedItem.value = item;
  isShowRemoveModal.value = true;
};
const closeRemoveModal = () => {
  removedItem.value = {};
  isShowRemoveModal.value = false;
};

const removeItem = (itemId) => {
  emit("remove", itemId);
  closeRemoveModal()
};
</script>

<style scoped lang="scss">
.list {
  max-width: 800px;
  margin: 0 auto;
  &-wrap {
    max-height: 400px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #8284fa;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #8284fa;
    }
  }
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: #4ea8de;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      position: relative;
      &:last-child {
        color: #8284fa;
        span {
          background: #4ea8de;
        }
      }
      span {
        margin-left: 12px;
        font-size: 14px;
        border-radius: 999px;
        background: var(--gray-400, #333);
        color: $white;
        padding: 6px 14px;
        background: #8284fa;
      }
    }
  }
  &-content {
    margin-top: 30px;
    border-radius: 8px;
    border-top: 1px solid #333;
    padding-top: 65px;
  }
  &-item {
    user-select: none;
    padding: 0 50px;
    border-radius: 8px;
    border: 1px solid #262626;
    background: #262626;
    position: relative;
    transition: background $trans;
    cursor: pointer;
    &:not(:first-child) {
      margin-top: 15px;
    }
    &:hover {
      background: #2c2c2c;
    }
    &.finished .list-item__title {
      text-decoration: line-through #cecece;
    }
    &__action {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__progress {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__title {
      color: #f2f2f2;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
      border-left: 1px solid #3d3d3d;
      border-right: 1px solid #3d3d3d;
      padding: 15px;
      @include truncate();
    }
  }
  &-empty {
    &__icon {
      text-align: center;
      margin-bottom: 30px;
    }
    &__title {
      color: #808080;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      span {
        font-weight: 500;
        display: block;
        margin-top: 12px;
      }
    }
  }
}
</style>
