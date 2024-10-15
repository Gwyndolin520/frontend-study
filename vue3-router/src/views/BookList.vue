<template>
  <div class="book-list">
    <h2>书籍列表</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <img :src="getURL(book.cover)" alt="封面图片" class="book-cover" />
        <div class="book-info">
          <router-link :to="`/books/${book.id}`" class="title">{{ book.title }}</router-link>
          <p class="author">作者：{{ book.author }}</p>
          <div class="price-info">
            <p v-if="book.discountPrice" class="price">
              <span class="discount-price">{{ book.discountPrice }} 元</span>
              <!-- <span class="original-price">{{ book.price }} 元</span>
              <span class="discount-label">{{ calculateDiscount(book) }}% OFF</span> -->
            </p>
            <p v-else class="price">{{ book.price }} 元</p>
          </div>
          <p class="description">{{ book.description.slice(0, 50) }}...</p>
          <button @click="addToCart(book)" class="add-to-cart">加入购物车</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 计算图片 URL
const getURL = (url: string) => new URL(`${url}`, import.meta.url).href;

// 计算折扣百分比
const calculateDiscount = (book: any) => {
  const discount = ((1 - book.discountPrice / book.price) * 100).toFixed(0);
  return discount;
};

// 模拟数据
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

// 加入购物车功能
const addToCart = (book: any) => {
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
.book-list ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-list li {
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 0 auto;
}

.book-cover {
  width: 120px;
  height: 180px;
  margin-right: 15px;
  border-radius: 5px;
  object-fit: cover;
}

.book-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
}

.author {
  margin: 0px 0;   font-weight: 500;
  height: 25px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 10px;
  height: 45px;
  width: 100%;
}

.discount-price {
  color: #000000;
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 5px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
    margin-right: 5px;
}

.discount-label {
  background-color: #4caf50;
  color: white;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 0.8rem;
}

.description {
  margin: 5px 0;
  color: #666;
  line-height: 1.4;
}

.add-to-cart {
  align-self: flex-start;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #52cbff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #359ac0;
}
</style>
