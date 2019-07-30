<template>
  <input
    type="text"
    name="textSearched"
    v-model="textSearched"
    v-bind:placeholder="placeholder"
    v-on:focus="onFocus()"
    v-on:keyup="onKeyup()"
    v-on:input="onDebounce"
  />
</template>

<script>
import _ from 'lodash';

const DEBOUCE_TIME_MS = 500;

export default {
  name: 'input-search',
  props: {
    placeholder: {
      type: String,
      default: 'Type your text here...',
    },
    // debounceTime: {
    //   type: Number,
    //   default: 500,
    //   validator: debounceTime => debounceTime > 0,
    // },
  },
  data() {
    return {
      textSearched: '',
    };
  },
  methods: {
    onFocus() {
      console.log('FOCUSS');
      this.$emit('focus');
    },
    onKeyup() {
      console.log('KEYUPP:', this.textSearched);
      this.$emit('keyup', this.textSearched);
    },
    onDebounce: _.debounce(function (e) {
      console.log('DEBOUNCEE:', e.target.value);
      this.$emit('debounce', e.target.value);
    }, DEBOUCE_TIME_MS),
  },
};

</script>
