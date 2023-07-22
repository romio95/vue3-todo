<template>
  <Transition name="modal">
    <div class="remove" v-if="isShowModal">
      <div class="remove-bg" @click="closeModal"></div>
      <div class="remove-wrap">
        <div class="remove-close" @click="closeModal">
          <Icon name="close"></Icon>
        </div>
        <div class="remove-content">
          <div class="remove-title">
            Are you sure to remove {{ item.title }}?
          </div>
          <div class="remove-actions">
            <a href="#" @click.prevent="removeItem(item.id)">Yes</a>
            <a href="#" @click.prevent="closeModal">No</a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Icon from "@/components/atoms/Icon.vue";

import { defineEmits, defineProps, toRefs } from "vue";

const props = defineProps({
  item: {
    type: Object,
  },
  isShowModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "remove"]);

const { item } = toRefs(props);
const removeItem = (id) => {
  emit("remove", id);
};
const closeModal = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.remove {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  transition: opacity 0.3s ease;
  user-select: none;

  &-wrap {
    width: 600px;
    margin: auto;
    padding: 60px 30px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    border-radius: 8px;
    background: #1a1a1a;
  }
  &-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &-title {
    min-width: 120px;
    color: #8284fa;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    text-align: center;
  }
  &-actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
      padding: 16px 40px;
      border-radius: 8px;
      background: #1e6f9f;
      color: #f2f2f2;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      transition: background 0.3s ease;
      &:hover {
        background: #8284fa;
      }
      &:last-child {
        margin-left: 15px;
        background: #8284fa;
        &:hover {
          background: #1e6f9f;
        }
      }
    }
  }
}
</style>
