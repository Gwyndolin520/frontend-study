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
          <el-input
            placeholder="搜索新闻..."
            v-model="searchQuery"
            clearable
            style="margin-bottom: 20px;"
          />
          
          <el-row :gutter="20">
            <el-col v-for="article in paginatedArticles" :key="article.id" :span="8">
              <el-card :body-style="{ padding: '20px' }" class="card">
                <h3>{{ article.title }}</h3>
                <p>{{ article.summary }}</p>
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
        articles: [
          { id: 1, title: '新闻标题 1', summary: '这是新闻摘要 1...', category: 'international' },
          { id: 2, title: '新闻标题 2', summary: '这是新闻摘要 2...', category: 'domestic' },
          { id: 3, title: '新闻标题 3', summary: '这是新闻摘要 3...', category: 'technology' },
          { id: 4, title: '新闻标题 4', summary: '这是新闻摘要 4...', category: 'domestic' },
          { id: 5, title: '新闻标题 5', summary: '这是新闻摘要 5...', category: 'international' },
          { id: 6, title: '新闻标题 6', summary: '这是新闻摘要 6...', category: 'technology' },
          { id: 7, title: '新闻标题 7', summary: '这是新闻摘要 7...', category: 'domestic' },
          { id: 8, title: '新闻标题 8', summary: '这是新闻摘要 8...', category: 'international' },
          { id: 9, title: '新闻标题 9', summary: '这是新闻摘要 9...', category: 'technology' },
        ],
        favorites: [],
        displayedArticles: [],
      };
    },
    computed: {
      filteredArticles() {
        return this.articles.filter(article =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
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
  