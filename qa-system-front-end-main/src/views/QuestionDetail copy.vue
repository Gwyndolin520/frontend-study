<template>
    <NavList></NavList>
    <div class="question-detail-container">
        <h1>问题详情</h1>
        <div v-if="question" class="question-content">
            <div style="border: 1px solid;border-radius: 5px;">
                <h2>标题：{{ question.title }}</h2>
                <h3>
                    提问者：
                    <img @click="toOthers" class="avatar medium" :src="question.user.avatar" alt="头像"
                        title="查看他/她的信息" />
                    {{ question.user.username }}
                </h3>
                <p>创建时间：{{ question.createdAt }}</p>
                <p>内容：{{ question.content }}</p>
            </div>
            <el-form @submit.prevent="addAnswer" class="form-container">
                <el-form-item label="给出你的回答：" class="form-item">
                    <el-input type="textarea" v-model="newAnswer.content" rows="4" class="textarea-field"
                        required></el-input>
                </el-form-item>
                <el-button type="primary" native-type="submit" class="submit-button">提交回复</el-button>
            </el-form>
            <ul class="answers-list">
                <h3>回复</h3>
                <li v-for="answer in allAnswers" :key="answer.id" class="answer-item">
                    <h4 class="answer-user">
                        回复人：
                        <img @click="router.push(`/others/${answer.user.id}`)" class="avatar medium"
                            :src="answer.user.avatar" alt="头像" title="点击查看他/她的信息" />
                        {{ answer.user.username }}
                    </h4>
                    <span class="answer-time">回复时间：{{ answer.createdAt }}</span>
                    <p class="answer-content">回复内容：{{ answer.content }}</p>
                </li>
            </ul>
            <div style="text-align: center">
                <button class="pagination" @click="prevPage" :disabled="isFirstPage"
                    :class="{ disabled: isFirstPage }">上一页</button>
                <button class="pagination" @click="nextPage" :disabled="isLastPage"
                    :class="{ disabled: isLastPage }">下一页</button>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>



<script setup lang="ts">
import NavList from '@/components/NavList.vue';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Question, Answer } from '@/types';

const store = useStore();
const route = useRoute();
const router = useRouter();
const question = ref<Question | null>(null);
const allAnswers = ref<Answer[]>([]);
const newAnswer = ref({ content: '' });

const userId = computed(() => store.getters.getUserId);

const fetchQuestion = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/questions/${questionId}`);
        question.value = response.data.data;
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

const fetchAnswers = async (questionId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/answers/questionId/${questionId}`);
        allAnswers.value = response.data.data;
    } catch (error) {
        console.error('获取问题失败:', error);
    }
};

const addAnswer = async () => {
    if (newAnswer.value.content.trim()) {
        try {
            if (!userId.value) {
                alert("请先登录！");
                router.push('/login');
                return;
            }
            const response = await axios.post('http://localhost:8080/answers/reply', {
                content: newAnswer.value.content,
                questionId: question.value?.id,
                userId: userId.value
            });
            if (response.data.code === 201) {
                alert("回答成功！");
                fetchAnswers(Number(route.params.id));
                newAnswer.value.content = ''; // 清空输入框
            }
        } catch (error) {
            console.error('Failed to add answer:', error);
        }
    }
};

const toOthers = () => {
    router.push({ name: 'OthersProfiles', params: { uId: question.value?.user.id } });
};

const limit = ref<number>(3)
const offset = ref<number>(0)
const total = ref<number>(0)

const fetchByPage = async (questionId: number) => {
    axios.get(`http://localhost:8080/answers/questionId/${questionId}/page?limit=${limit.value}&offset=${offset.value}`)
        .then((res) => {
            allAnswers.value = res.data.data.answers;
            total.value = res.data.data.total;
        })
        .catch((error) => {
            console.error('获取问题失败:', error);
        })
}
const nextPage = (): void => {
    if (offset.value + limit.value >= allAnswers.value.length) {
        offset.value += limit.value;
        fetchByPage(questionId);
    }
}

const prevPage = (): void => {
    if (offset.value > 0) {
        offset.value -= limit.value;
    }
    fetchByPage(questionId);
}

const isFirstPage = computed(() => offset.value === 0);

const isLastPage = computed(() => offset.value + limit.value >= total.value);


const questionId = Number(route.params.id);
onMounted(() => {
    store.dispatch('fetchCurrentUser');
    const questionId = Number(route.params.id);
    fetchAnswers(questionId);
    fetchQuestion(questionId);
    fetchByPage(questionId);
});
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fa; /* 浅灰背景 */
    margin: 0;
    padding: 30px;
}

.question-detail-container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 30px auto;
    padding: 20px;
}

h1 {
    font-size: 2.5em;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.question-content {
    background-color: #f9f9f9;
    border-left: 5px solid #000000; /* 蓝色条 */
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
}

h2 {
    font-size: 1.8em;
    color: #444;
    margin-bottom: 10px;
}

h3 {
    font-size: 1.2em;
    color: #666;
    margin: 5px 0;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 10px;
    display: inline-block;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

p {
    color: #555;
    line-height: 1.5;
}

.el-form-item {
    margin-bottom: 20px;
}

.textarea-field {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    resize: none;
    transition: border-color 0.3s;
}

.textarea-field:focus {
    border-color: #000000;
    outline: none;
}

.submit-button {
    background-color: #000000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

.submit-button:hover {
    background-color: #0056b3;
}

.answers-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.answer-item {
    background-color: #e9f5ff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    transition: transform 0.2s;
}

.answer-item:hover {
    transform: scale(1.02); /* 悬停时放大 */
}

.answer-user {
    font-weight: bold;
    color: #030303;
}

.answer-time {
    color: #999;
    font-size: 0.9em;
}

.answer-content {
    color: #333;
    margin-top: 10px;
}

.pagination {
    background-color: #000000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 10px 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination:hover {
    background-color: #818181;
}

.pagination:disabled {
    background-color: #ccc; /* 禁用状态 */
    cursor: not-allowed;
}


</style>