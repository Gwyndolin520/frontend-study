<template>
  <div class="book-detail">
    <h2>{{ book.title }}</h2>
    <img :src="getURL(book.cover)" alt="封面图片" />
    <p><strong>作者：</strong>{{ book.author }}</p>
    
    <div class="price-info">
      <p v-if="book.discountPrice">
        <span class="discount-price">{{ book.discountPrice }} 元</span>
        <!-- <span class="original-price">{{ book.price }} 元</span>
        <span class="discount-label">{{ calculateDiscount(book) }}% OFF</span> -->
      </p>
      <p v-else>{{ book.price }} 元</p>
    </div>

    <p><strong>简介：</strong>{{ book.description }}</p>
    <button @click="addToCart">加入购物车</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

// 图片 URL 处理函数
const getURL = (url: string) => new URL(`${url}`, import.meta.url).href;

const route = useRoute(); // 获取当前路由参数

// 模拟书籍数据
const books = [
  {
    id: 1,
    title: 'Java核心技术·卷 I·基础知识',
    author: 'CayS,Horstmann',
    price: 30,
    discountPrice: 30,
    cover: '../assets/xi.png',
    description: 'Java 领域极有影响力和价值的著作之一，与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。',
  },
  {
    id: 2,
    title: 'Java核心技术·卷 II·高级特性',
    author: 'CayS,Horstmann',
    price: 30,
    discountPrice: 30,
    cover: '../assets/ho.png',
    description: '本书涵盖了完整的对高级 UI 特性、企业编程、网络、安全和 Java 强大的模块系统等内容的讨论。书中对 Java 复杂的新特性进行了深入而全面的研究，展示了如何使用它们来构建具有专业品质的应用程序，作者所设计的经过全面完整测试的示例反映了当今的 Java 风格和最佳实践，这些示例设计精心，使其易于理解并且实践价值极高，从而使读者可以以这些示例为基础来编写自己的代码.',
  },
  {
    id: 3,
    title: 'Java 编程思想（Thinking in Java）',
    author: 'Bruce Eckel ',
    price: 45,
    discountPrice: 45,
    cover: '../assets/sa.png',
    description: '本书赢得了全球程序员的广泛赞誉，即使是最晦涩的概念，在Bruce Eckel 的文字亲和力和小而直接的编程示例面前也会化解于无形。从 Java 的基础语法到最高级特性（深入的面向对象概念、多线程、自动项目构建、单元测试和调试等），本书都能逐步指导你轻松掌握',
  },
  {
    id: 4,
    title: 'Effective Java中文版',
    author: 'Joshua Bloch',
    price: 42,
    discountPrice: 35,
    cover: '../assets/sh.png',
    description: '本书一共包含90个条目，每个条目讨论 Java 程序设计中的一条规则。这些规则反映了最有经验的优秀程序员在实践中常用的一些有益的做法。全书以一种比较松散的方式将这些条目组织成11章，每一章都涉及软件设计的一个主要方面。因此，本书并不一定需要按部就班地从头读到尾，因为每个条目都有一定程度的独立性。这些条目相互之间经常交叉引用，因此可以很容易地在书中找到自己需要的内容。',

              
  }
];
const book = books.find((b) => b.id === Number(route.params.id));

// 计算折扣百分比
const calculateDiscount = (book: any) => {
  const discount = ((1 - book.discountPrice / book.price) * 100).toFixed(0);
  return discount;
};

// 加入购物车函数：将书籍添加到购物车
const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingItem = cart.find((item: { id: number }) => item.id === book.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('已加入购物车');
};
</script>

<style scoped>
 
.book-detail {
  text-align: center;
  margin-top: 20px;
}

.book-detail img {
  width: 200px;
  height: 300px;
  margin: 10px 0;
}

.price-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.discount-price {
  color: #000000;
  font-size: 1.5rem;
  font-weight: bold;
    margin-right: 5px;
 
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 1.1rem;
    margin-right: 5px;
}

.discount-label {
  background-color: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.9rem;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #359ac0;
}
</style>
