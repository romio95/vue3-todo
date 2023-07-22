<template>
  <Transition name="modal">
    <div class="info" v-if="isShowModal">
      <div class="info-bg"></div>
      <div class="info-wrap">
        <div class="info-content">
          <div class="info-close" @click="closeModal">
            <Icon name="close"></Icon>
          </div>
          <div class="info-list" v-if="item">
            <div class="info-item">
              <div class="info-item__title">Name:</div>
              <div class="info-item__info">{{ item.title }}</div>
            </div>
            <div class="info-item">
              <div class="info-item__title">Description:</div>
              <div class="info-item__info">{{ item.description }}</div>
            </div>
            <div class="info-item">
              <div class="info-item__title">Created:</div>
              <div class="info-item__info">
                {{ formatDate(item.createdAt) }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item__title">Finished:</div>
              <div class="info-item__info">
                <span class="green" v-if="item.finished">&#10004;</span>
                <span class="red" v-else>&#10006;</span>
              </div>
            </div>
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

const emit = defineEmits(["close"]);

const { item } = toRefs(props);

const closeModal = () => {
  emit("close");
};

const formatDate = (inputDate) => {
  const day = inputDate.getUTCDate().toString().padStart(2, "0");
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getUTCFullYear().toString().slice(-2);

  const hours = inputDate.getUTCHours().toString().padStart(2, "0");
  const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
</script>

<style lang="scss" scoped>
.info {
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
  &-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    &:not(:first-child) {
      margin-top: 25px;
    }
    &__title {
      margin-right: 15px;
      min-width: 120px;
      color: #8284fa;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
    }
    &__info {
      color: #1e6f9f;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      span {
        &.green {
          color: greenyellow;
        }
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
