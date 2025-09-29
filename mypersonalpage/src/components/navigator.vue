<template>
    <nav>
        <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navigator',
}
</script>

<style scoped>
nav {
    background-color: rgba(128, 0, 107, 0.3);
    padding: 10px;
    border-radius: 5px;
}
ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
}
li {
  text-decoration: none;
  border: 1px solid rgba(0, 255, 255, 1);
  border-radius: 10px;
  background-color: rgba(0, 255, 255, 0.5);
  padding: 10px 20px;
  text-align: center;
  transition: background-color 0.3s ease;
}

/* 新增的关键样式 */
li a {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素文字颜色 */
  display: block; /* 使链接填充整个li区域 */
  width: 100%;
  height: 100%;
}

li:hover {
  background-color: rgba(0, 255, 255, 1);
}
</style>