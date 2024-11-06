<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>ADD POSTS</h4>
          <hr />
          <div class="mt-2 alert alert-danger" v-if="validation.errors">
            <ul class="my-0">
              <li v-for="(error, index) in errors" :key="index">
                {{ `${error.param} : ${error.msg}` }}
              </li>
            </ul>
          </div>
          <form @submit.prevent="store">
            <div class="form-group">
              <label for="title" class="font-weight-bold mb-2">TITLE</label>
              <input type="text" class="form-control" v-model="post.title" placeholder="Input your Title Post" />
            </div>
            <div class="form-group mt-3">
              <label for="title" class="font-weight-bold mb-2">CONTENT</label>
              <textarea rows="4" class="form-control" v-model="post.content" placeholder="Input your Content Post"></textarea>
            </div>
            <button type="submit" class="btn btn-primary mt-3">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import config from '@/config';
export default {
  setup() {
    const post = reactive({
      title: '',
      content: '',
    });
    const validation = ref([]);
    const router = useRouter();
    function store() {
      let title = post.title;
      let content = post.content;
      axios
        .post(config.baseUrl + '/api/posts' + '/store', {
          title: title,
          content: content,
        })
        .then(() => {
          router.push({
            name: 'posts.index',
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return {
      post,
      validation,
      router,
      store,
    };
  },
};
</script>

<style></style>
