<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>DATA POSTS</h4>
          <hr />
          <router-link :to="{ name: 'posts.create' }" class="btn btn-md btn-success">TAMBAH POST</router-link>
          <table class="table table-striped table-bordered mt-4">
            <thead class="thead-dark">
              <tr>
                <th scope="col">TITLE</th>
                <th scope="col">CONTENT</th>
                <th scope="col">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts" :key="index">
                <td>{{ post.title }}</td>
                <td>{{ post.content }}</td>
                <td class="text-center">
                  <router-link :to="{ name: 'posts.edit', params: { id: post.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                  |
                  <button @click.prevent="postDelete(post.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import config from '@/config';
export default {
  setup() {
    let posts = ref([]);

    onMounted(() => {
      getDataPosts();
    });

    function getDataPosts() {
      axios
        .get(config.baseUrl + '/api/posts')
        .then((response) => {
          posts.value = response.data.data;
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    }

    function postDelete(id) {
      axios
        .delete(config.baseUrl + '/api/posts' + '/delete/' + id)
        .then(() => {
          getDataPosts();
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    }

    return {
      posts,
      getDataPosts,
      postDelete,
    };
  },
};
</script>

<style></style>
