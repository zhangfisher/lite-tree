
<template>
    <a class="repo_card" :href="githubRepo.html_url" target="_blank">
        <h2 class="title">{{ repo.name }}
            <GithubIcon/>
        </h2>   
        {{ repo.title || githubRepo.description }}
        <div class="repo_stats">
            <div class="author">{{ repo.author }}</div>         
            <div class="item"><StarIcon/>{{ githubRepo.stargazers_count }}</div>        
            <div class="item"><ForkIcon/>{{ githubRepo.forks }}</div>                      
        </div>
         
    </a>
</template>

<script setup lang="ts">
import type { Repo } from './types'; 
import StarIcon from "./icons/StarIcon.vue"
import ForkIcon from './icons/ForkIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'

const props = defineProps<Repo>()

</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { GithubRepo  } from './types'; 


export default defineComponent<{
    githubRepo:GithubRepo
}>({
    data() {
        return {
            githubRepo: {
                stargazers_count: 0,
                forks: 0,
                description: '',
            }
        }
    },
    mounted() {
        const repoUrl = `https://api.github.com/repos/${this.repo.author}/${this.repo.repo}`;
        fetch(repoUrl).then(response=>{
            response.json().then(data=>{
                Object.assign(this.githubRepo,data)
            }) 
        })
    }
})
</script>

<style scoped>
a.repo_card{
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
    padding: 24px;
    cursor: pointer;
}
.repo_card:hover {
  border-color: var(--vp-c-brand-1);
}



.repo_card > .title{
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;    
}

.repo_stats{
    display: flex;
    justify-content: space-between;
    margin-top:4px;
    font-size: 14px;
    color: var(--vp-c-text-soft);
    flex-direction: row;
}

.repo_stats > .author{
    flex-grow: 1;
}
.repo_stats >.item{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 12px;
}
.repo_stats >.item > svg{
    margin-right: 8px;
}


</style>