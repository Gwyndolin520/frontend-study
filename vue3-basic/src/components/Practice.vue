<template>
    <el-container style="height: 100vh">
      <el-header>
        <h1 style="color: #409EFF; text-align: center;">新闻页面</h1>
      </el-header>
  
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="menu">
            <el-menu-item index="1" @click="filterCategory('all')">全部新闻</el-menu-item>
            <el-menu-item index="2" @click="filterCategory('international')">国际新闻</el-menu-item>
            <el-menu-item index="3" @click="filterCategory('domestic')">国内新闻</el-menu-item>
            <el-menu-item index="4" @click="filterCategory('technology')">科技新闻</el-menu-item>
          </el-menu>
        </el-aside>
  
        <el-main>
          <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="6">
              <el-input placeholder="搜索新闻..." v-model="searchQuery" clearable />
            </el-col>
            <el-col :span="6">
              <el-input placeholder="搜索用户..." v-model="userSearchQuery" clearable />
            </el-col>
            <el-col :span="6">
              <el-input placeholder="搜索日期..." v-model="dateSearchQuery" clearable />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="applyFilters">应用过滤</el-button>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col v-for="article in paginatedArticles" :key="article.id" :span="8">
              <el-card :body-style="{ padding: '20px' }" class="card">
                <h3>{{ article.title }}</h3>
                <p>{{ article.summary }}</p>
                <p><strong>日期:</strong> {{ article.date }}</p>
                <p>
                  <el-avatar :src="article.userAvatar" size="32" />
                  {{ article.userName }}
                </p>
                <el-button type="primary" @click="viewArticle(article.id)">阅读更多</el-button>
                <el-button type="success" @click="toggleFavorite(article.id)">
                  {{ isFavorite(article.id) ? '已收藏' : '收藏' }}
                </el-button>
              </el-card>
            </el-col>
          </el-row>
  
          <el-button type="primary" @click="loadMore" style="margin-top: 20px;">加载更多</el-button>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        searchQuery: '',
        userSearchQuery: '',
        dateSearchQuery: '',
        selectedCategory: 'all',
        articles: [
          { id: 1, title: '新闻标题 1', summary: '这是新闻摘要 1...', date: '2024-09-25', userName: '用户A', userAvatar: 'https://via.placeholder.com/32', category: 'international' },
          { id: 2, title: '新闻标题 2', summary: '这是新闻摘要 2...', date: '2024-09-24', userName: '用户B', userAvatar: 'https://via.placeholder.com/32', category: 'domestic' },
          { id: 3, title: '新闻标题 3', summary: '这是新闻摘要 3...', date: '2024-09-23', userName: '用户C', userAvatar: 'https://via.placeholder.com/32', category: 'technology' },
          { id: 4, title: '新闻标题 4', summary: '这是新闻摘要 4...', date: '2024-09-22', userName: '用户D', userAvatar: 'https://via.placeholder.com/32', category: 'domestic' },
          { id: 5, title: '新闻标题 5', summary: '这是新闻摘要 5...', date: '2024-09-21', userName: '用户E', userAvatar: 'https://via.placeholder.com/32', category: 'international' },
          { id: 6, title: '新闻标题 6', summary: '这是新闻摘要 6...', date: '2024-09-20', userName: '用户F', userAvatar: 'https://via.placeholder.com/32', category: 'technology' },
          { id: 7, title: '新闻标题 7', summary: '这是新闻摘要 7...', date: '2024-09-19', userName: '用户G', userAvatar: 'https://via.placeholder.com/32', category: 'domestic' },
          { id: 8, title: '新闻标题 8', summary: '这是新闻摘要 8...', date: '2024-09-18', userName: '用户H', userAvatar: 'https://via.placeholder.com/32', category: 'international' },
          { id: 9, title: '新闻标题 9', summary: '这是新闻摘要 9...', date: '2024-09-17', userName: '用户I', userAvatar: 'https://via.placeholder.com/32', category: 'technology' },
        ],
        favorites: [],
        displayedArticles: [],
      };
    },
    computed: {
      filteredArticles() {
        return this.articles.filter(article =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          article.userName.toLowerCase().includes(this.userSearchQuery.toLowerCase()) &&
          article.date.includes(this.dateSearchQuery) &&
          (this.selectedCategory === 'all' || article.category === this.selectedCategory)
        );
      },
      paginatedArticles() {
        return this.filteredArticles.slice(0, this.currentPage * this.pageSize);
      },
    },
    methods: {
      filterCategory(category) {
        this.selectedCategory = category === 'all' ? 'all' : category;
        this.currentPage = 1; // Reset to first page when filtering
      },
      loadMore() {
        this.currentPage++;
      },
      viewArticle(id) {
        alert(`查看文章 ID: ${id}`);
        // 在这里可以跳转到详细页面
      },
      toggleFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index === -1) {
          this.favorites.push(id);
        } else {
          this.favorites.splice(index, 1);
        }
      },
      isFavorite(id) {
        return this.favorites.includes(id);
      },
      applyFilters() {
        this.currentPage = 1; // Reset to first page when applying filters
      },
    },
  };
  </script>
  
  <style scoped>
  .menu {
    background-color: #f5f5f5;
  }
  
  .card {
    margin-bottom: 20px;
  }
  </style>