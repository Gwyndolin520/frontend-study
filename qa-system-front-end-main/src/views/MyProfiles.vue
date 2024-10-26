<template>
    <NavList></NavList>
    <div class="user-info-container">
        <h1>我的主页</h1>
        <div v-if="user" class="user-details">
            <h2>
                <img class="avatar large" :src="user.avatar" alt="头像" />
                
            </h2>
            <h2>
                用户名：{{ user.username }}
            </h2>
            <h3>
                介绍：淡薄功利，轻装前进;不计付出，坚韧不拔;不达目的，誓不罢休。
            </h3>
            <h4>
                创建时间：{{ user.createdAt }}
            </h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { User } from "@/types";
import store from '@/store';

const userId = store.getters.getUserId;

const user = ref<User | null>(null);
const fetchUserInfo = async (userId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        user.value = response.data.data;
        console.log('用户详情：' + user.value?.username);
    } catch (error) {
        console.error('获取用户详情失败:', error);
    }
};

onMounted(() => {
    fetchUserInfo(userId);
});



</script>

<style scoped>
.user-info-container {
    width: 80vw;
    
    margin: 200px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .1);
    border-radius: 10px;
    overflow: hidden;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.user-details {
    text-align: center;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: inline-block;
    overflow: hidden;
    border: 2px solid #000000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    vertical-align: middle;
    margin-right: 15px;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar.large {
    width: 100px;
    height: 100px;
}

h3 {
    color: #333;
    margin: 10px 0;
    margin-bottom: 10px;
    justify-content: flex-end;
}
h4{
    color: #000000;
    margin: 20px 0;
    opacity: 30%;
}

@media (max-width: 768px) {
    .avatar.large {
        width: 80px;
        height: 80px;
    }
}
</style>