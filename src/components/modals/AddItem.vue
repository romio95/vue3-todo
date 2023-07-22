<template>
  <Transition name="modal">
    <div class="create" v-if="isShowCreateModal">
      <div class="create-bg" @click="$emit('close')"></div>
      <div class="create-wrap">
        <div class="create-content">
          <div class="create-close" @click="closeModal">
            <Icon name="close"></Icon>
          </div>
          <div class="create-form">
            <div class="create-form__row">
              <label>
                <input
                  type="text"
                  placeholder="Add title"
                  name="title"
                  v-model="title"
                />
              </label>
            </div>
            <div class="create-form__row">
              <label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Add description"
                  v-model="description"
                ></textarea>
              </label>
            </div>
            <div class="create-form__row">
              <button :disabled="!title" @click="addItem">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Icon from "@/components/atoms/Icon.vue";
import { ref, defineEmits, defineProps, toRefs } from "vue";

const props = defineProps({
  isShowCreateModal: {
    type: Boolean,
    default: false,
  },
});

const { isShowCreateModal } = toRefs(props);

const emit = defineEmits(["close", "add"]);

const title = ref(null);
const description = ref(null);
const closeModal = () => {
  emit("close");
  resetForm();
};
const addItem = () => {
  emit("add", {
    id: Date.now(),
    title: title.value,
    description: description.value,
    createdAt: new Date(),
    finished: false,
  });
  resetForm();
  emit("close");
};

const resetForm = () => {
  title.value = "";
  description.value = "";
};
</script>

<style lang="scss" scoped>
.create {
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
  &-form {
    text-align: center;
    &__row {
      width: 100%;
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
    label {
      width: 100%;
      display: block;
    }
    input,
    textarea {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      border: 1px solid var(--gray-700, #0d0d0d);
      background: var(--gray-500, #262626);
      color: $white;
      padding: 10px 20px;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.2;
      &::placeholder {
        font-size: 16px;
        line-height: 1.2;
        color: #cecece;
        font-family: Arial, sans-serif;
      }
    }
    textarea {
      resize: none;
      min-height: 150px;
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
    button {
      padding: 10px 25px;
      margin: 0 auto;
      display: inline-block;
      text-decoration: none;
      border-radius: 8px;
      background: #1e6f9f;
      color: #f2f2f2;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      transition: background 0.3s ease, opacity $trans;
      &:disabled {
        opacity: 0.4;
        pointer-events: none;
      }
      &:hover {
        background: #8284fa;
      }
    }
  }
}
</style>
