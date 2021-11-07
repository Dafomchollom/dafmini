<template>
  <div class="search_wrapper">
    <h3>Search By:</h3>
    <div>
      <ValidationObserver ref="searchObserver" tag="div">
        <a-row :gutter="6" type="flex">
          <a-col :span="14">
            <AppInputComponent
              v-model="searchObj.productName"
              label="Product Name"
              placeholder="Product Name"
              name="Product Name"
            />
          </a-col>
          <a-col :span="10">
            <AppSelectComponent
              v-model="searchObj.productType"
              label="Product Type"
              placeholder="Product Type"
              rules="required"
              name="Product Type"
              url="/api/product/productType"
              :call-back-func="
                (resp) => ({
                  text: resp.name + ' (' + resp.description + ')',
                  value: resp._id,
                })
              "
            />
          </a-col>
          <a-col :span="24">
            <a-button
              class="search_wrapper-submitBtn"
              type="primary"
              shape="round"
              size="large"
              @click="searchHandler"
              >search</a-button
            >
          </a-col>
        </a-row>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AppInputComponent from '@/components/input-components/AppInputComponent'
import AppSelectComponent from '@/components/input-components/AppSelectComponent'
export default {
  components: {
    ValidationObserver,
    AppInputComponent,
    AppSelectComponent,
  },
  data() {
    return {
      searchObj: {
        productType: '',
        productName: '',
      },
    }
  },
  methods: {
    async searchHandler() {
      const valid = await this.$refs.searchObserver.validate()
      if (valid) {
        const { data } = await this.$axios.get(`/api/product/`, {
          params: {
            ...this.searchObj,
          },
        })
        this.$notification.success({
          message: 'Successful search',
          duration: 5,
        })
        this.products = data
        this.$emit('products', data)
      } else {
        this.$notification.warning({
          message: 'Wrong Input',
          description: 'Please Input the required fields',
          duration: 0,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search_wrapper {
  width: 100%;
  max-width: 50rem;
  text-align: center;
  background: #fff;
  margin: 0px auto;
  padding: 10px 25px;
  border-radius: 10px;
  h3 {
    color: #2645ff;
    font-weight: bold;
    font-size: 15px;
  }
  .search_wrapper-submitBtn {
    width: 100%;
    margin: 10px 0px;
  }
}
</style>
