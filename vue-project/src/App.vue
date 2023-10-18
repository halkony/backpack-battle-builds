<script setup>
import * as contentful from "contentful";
import { ref, computed } from "vue";


const name = "Natedog"
const jobTitle = "Software Engineer"
const company = "Nate's Company"

const client = contentful.createClient({
  space: "imxvjgy0efpu",
  environment: "master", // defaults to 'master' if not set
  accessToken: "EjpljZZcaunI7ZT9dtUJV3ImPJUQ37I_hdMs4zPbgoQ",
});

let postsFromAPI = ref([]);
client
  .getEntries()
  .then((entries) => (postsFromAPI.value = entries.items))
  .catch(console.error);



let thumbnail = (post) => {
  return post.fields.thumbnail.fields.file.url;
};

let title = (post) => {
  return post.fields.title;
};

let body = (post) => {
  return post.fields.body.content[0].content[0].value;
};

let imageUrl = (post) => {
  return post.fields.thumbnail.fields.file.url;
};

// compute posts with the above functions from api
let posts = computed(() => {
  return postsFromAPI.value.map((post) => {
    return {
      thumbnail: thumbnail(post),
      title: title(post),
      body: body(post),
      imageUrl: imageUrl(post),
    };
  });
});
console.log(posts);
</script>

<template>
  <h1>{{ name }}</h1>
  <h2>{{ jobTitle }}</h2>
  <h3>{{ company }}</h3>
  <hr />
  <div class="posts-container">
    <div class="post" v-for="post in posts" :key="post.title">
      <img
        class="thumbnail"
        :src="post.imageUrl"
      />
      <div class="post-preview">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/main.scss";
</style>
