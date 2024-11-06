<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>EDIT POSTS</h4>
          <hr />
          <div class="mt-2 alert alert-danger" v-if="validation.errors">
            <ul class="my-0">
              <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
            </ul>
          </div>
          <form @submit.prevent="update">
            <div class="form-group">
              <label for="title" class="font-weight-bold mb-2">TITLE</label>
              <input type="text" class="form-control" v-model="post.title" placeholder="Input your Title Post" />
            </div>
            <div class="form-group mt-3">
              <label for="content" class="font-weight-bold mb-2">CONTENT</label>
              <textarea rows="4" class="form-control" v-model="post.content" placeholder="Input your Content Post"></textarea>
            </div>
            <button type="submit" class="btn btn-primary mt-3">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import config from '@/config';
export default {
  setup() {
    const post = reactive({
      title: '',
      content: '',
    });
    const router = useRouter();
    const route = useRoute();
    const validation = ref([]);

    onMounted(() => {
      axios
        .get(config.baseUrl + '/api/posts' + '/' + route.params.id)
        .then((response) => {
          post.title = response.data.data.title;
          post.content = response.data.data.content;
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    });

    function update() {
      let title = post.title;
      let content = post.content;
      axios
        .patch(config.baseUrl + '/api/posts' + '/update/' + route.params.id, {
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
      update,
    };
  },
};
</script>

<style></style>
