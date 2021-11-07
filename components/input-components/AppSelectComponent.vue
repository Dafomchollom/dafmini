<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label="label"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      labelAlign="left"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
      :colon="colon"
      :required="required"
    >
      <!-- <template v-if="label" slot="label">
        <span v-if="mode === 'multiple'"
          >{{ label }} <span style="color: #9c7ae6"><a-icon type="tags" /></span
        ></span>
        <span v-else>{{ label }}</span>
      </template> -->
      <a-select
        v-model="innerValue"
        show-search
        style="width: 100%"
        :allow-clear="allowClear"
        :default-active-first-option="false"
        :show-arrow="true"
        :size="size"
        option-filter-prop="children"
        :filter-option="filterOption"
        :not-found-content="'Not Found'"
        :mode="mode"
        :placeholder="placeholder"
        :disabled="disabled || readonly"
        :loading="fetching"
        :default-value="defaultValue"
        @focus="handleSearch"
        @change="handleChange"
        @blur="handleBlur"
        @select="selectHandler"
      >
        <template v-if="remote">
          <template>
            <a-select-option
              v-for="d in dataRemote"
              :key="d.value"
              :title="d.text"
              >{{ d.text }}
            </a-select-option>
            <a-select-option
              v-if="showDescription"
              :key="innerValue"
              :title="description"
              >{{ innerValue }} - {{ description }}
            </a-select-option>
          </template>
        </template>
        <template v-else>
          <template v-if="data && data.length !== ''">
            <a-select-option
              v-for="(i, index) in data"
              :key="i + '-' + index"
              :value="i"
            >
              {{ i }}
            </a-select-option>
          </template>
        </template>
      </a-select>
    </a-form-item>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppSelect',
  components: {
    ValidationProvider,
  },
  props: {
    vid: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    vDecorator: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: '',
    },
    callBackFunc: {
      type: Function,
      default: () => 1,
    },
    mode: {
      type: String,
      validator: (prop) => ['default', 'multiple', 'tags'].includes(prop),
      default: 'default',
    },
    size: {
      type: String,
      validator: (prop) => ['default', 'large', 'small'].includes(prop),
      default: 'default',
    },
    remote: {
      type: Boolean,
      default: true,
    },
    colon: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Array],
      default: () => '',
    },
    defaultValue: {
      type: [String, Number, Array],
      default: () => '',
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      lastFetchId: 0,
      dataRemote: [],
      fetching: false,
      innerValue: undefined,
    }
  },
  computed: {
    showDescription() {
      if (
        this.dataRemote.length === 0 &&
        this.description &&
        this.description !== ''
      ) {
        return true
      }
      return false
    },
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      if (newVal && (newVal !== '' || newVal.length > 0)) {
        this.innerValue = newVal
      } else {
        this.innerValue = undefined
      }
    },
  },
  created() {
    if (this.value && this.value.length > 0) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
  methods: {
    fetchUser() {
      if (this.lastFetchId > 0) {
        return
      }
      const callBackFunc = this.callBackFunc
      this.dataRemote = []
      this.fetching = true
      this.$axios
        .$get(this.url)
        .then((body) => {
          if (body.response && Array.isArray(body.response)) {
            const dataRemote = body.response.map(callBackFunc)
            this.dataRemote = dataRemote
          } else if (!body.response) {
            const dataRemote = body.map(callBackFunc)
            this.dataRemote = dataRemote
          } else {
            const dataRemote = body.response.content.map(callBackFunc)
            this.dataRemote = dataRemote
          }
          this.fetching = false
          this.lastFetchId += 1
        })
        .catch((err) => {
          console.log('error', err)
          this.fetching = false
        })
    },
    handleSearch(value) {
      if (this.remote) {
        this.fetchUser(value)
      }
    },
    handleChange(value) {
      this.$emit('change', value)
    },
    handleBlur(value) {
      this.$emit('blur', value)
    },
    resolveState({ errors, flags }) {
      if (errors[0]) {
        return 'error'
      }
      if (flags.pending) {
        return 'validating'
      }
      if (flags.valid) {
        return 'success'
      }
      return ''
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    selectHandler(value, option) {
      this.$emit('select', value, option)
    },
  },
}
</script>
<style>
/* .ant-select-selection {
  border-radius: 20px;
  padding: 20px 15px;
} */
/* .ant-select-selection__placeholder {
  position: relative !important;
  top: 0px !important;
} */
/* .ant-select-selection-selected-value,
.ant-select-search__field {
  position: relative !important;
  bottom: 15px !important;
} */
/* .ant-select-selection .ant-form-explain {
  position: relative !important;
  bottom: 15px !important;
} */
.ant-input {
  border-radius: 20px !important;
  padding: 20px 15px !important;
}
.ant-select-selection--single {
  height: auto;
}
.ant-select-selection__rendered {
  padding: 5px 15px !important;
}
.ant-select-selection {
  border-radius: 20px !important;
}
.ant-input:disabled {
  background-color: #f8f8f8 !important;
  opacity: 1;
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.85) !important;
}
.ant-form-item {
  margin-bottom: 10px;
}
.ant-form-item-label {
  width: 100%;
}
.ant-form-explain {
  text-align: left;
}
</style>
