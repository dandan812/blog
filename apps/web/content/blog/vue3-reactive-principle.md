---
title: "从 Vue 3.6 响应式原理，看 ref 和 reactive 的真实区别"
description: "深入理解 Vue 3 响应式系统的底层实现，掌握 ref 和 reactive 的正确使用场景"
date: "2026-02-12"
tags: ["Vue 3", "响应式", "源码分析", "前端基础"]
category: "前端开发"
readingTime: 12
---

## 前言

Vue 3 的响应式系统彻底重写了 Vue 2，用 Proxy + Reflect 实现了更灵活、高效的响应式。

在日常开发中，我们会用 `reactive` 和 `ref` 来管理状态，但很多人只会用，不明白原理。面试时被问到 "为什么 reactive 解构会丢失响应性？" 就答不上来。

本文带你从底层理解两者的真实区别。

---

## Proxy 原理概览

Vue 3 核心依赖 Proxy 来拦截对象操作：

```javascript
const state = reactive({ count: 0 });

effect(() => {
  console.log(state.count); // track 收集依赖
});

state.count++; // trigger 触发更新
```

**核心机制：**

- **track**：当访问属性时，收集依赖（effect）
- **trigger**：当属性变化时，触发依赖更新

这个机制保证了视图和数据的同步，同时性能比 Vue 2 的 `Object.defineProperty` 高很多。

### 为什么 Proxy 更好？

Vue 2 的 `Object.defineProperty` 有几个硬伤：

1. **无法监听新增属性** - 必须用 `Vue.set`
2. **无法监听数组索引** - 数组操作受限
3. **深度递归性能差** - 初始化时遍历所有属性

Proxy 直接代理整个对象，没有这些限制。

---

## reactive vs ref

### reactive

特点：
- 只能包对象（数组也是对象）
- 返回一个深层 Proxy
- 自动递归处理对象属性的响应式
- **解构会丢失响应性**

```javascript
const state = reactive({ count: 0 });
const { count } = state;

count++; // ❌ 不再响应，因为解构出来的是普通值
```

**为什么会这样？**

因为 `reactive` 返回的是 Proxy 对象，解构时 `const { count } = state` 相当于 `const count = state.count`，这时候 `count` 只是一个数字 0，和 Proxy 没关系了。

### ref

特点：
- 可以包任意类型（对象、数组、原始值）
- 内部通过 `.value` 访问
- getter/setter 处理 track/trigger
- **解构不会丢失响应性**（只要保持引用）

```javascript
const num = ref(0);
num.value++; // ✅ 响应式正常

// 解构也可以
const { value } = num;
value++; // ❌ 这样不行，value 是原始值

// 正确做法
const numRef = ref(0);
const update = () => {
  numRef.value++; // ✅ 始终保持引用
};
```

**ref 的内部实现：**

```javascript
// 简化版
function ref(value) {
  return {
    get value() {
      track(this, 'value'); // 收集依赖
      return value;
    },
    set value(newVal) {
      value = newVal;
      trigger(this, 'value'); // 触发更新
    }
  };
}
```

---

## 保持 reactive 解构响应性

如果确实需要解构，用 `toRefs`：

```javascript
const state = reactive({ count: 0, name: 'Vue' });
const { count, name } = toRefs(state);

count.value++; // ✅ 响应式正常
name.value = 'React'; // ✅ 同样有效
```

**toRefs 的原理：**

```javascript
function toRefs(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = {
      get value() { return obj[key]; },
      set value(v) { obj[key] = v; }
    };
  }
  return result;
}
```

本质上就是把 reactive 对象的每个属性都转成 ref。

---

## 为什么会有这种设计

理解设计动机，比死记硬背更重要：

### 1. Proxy 适合对象，ref 适合单值

- `reactive` 是 Proxy 的包装，天然适合复杂对象
- `ref` 是 getter/setter 的包装，适合原始值和简单场景

### 2. 组合式 API 的灵活性

```javascript
// 用 ref 更灵活
const count = ref(0);
const double = computed(() => count.value * 2);

// 用 reactive 更结构化
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2)
});
```

### 3. 解构丢失响应性是 Proxy 的副作用

不是 Vue 的 bug，是语言特性决定的。Vue 提供 `toRefs` 来解决，而不是改变 Proxy 的行为。

---

## 实际使用建议

### 什么时候用 ref？

- 原始值（string、number、boolean）
- 需要替换整个对象时
- 逻辑独立、可复用的状态

```javascript
// 计数器
const count = ref(0);

// 异步数据
const user = ref(null);
user.value = await fetchUser();

// 组合式函数返回
export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  // ...
  return { x, y };
}
```

### 什么时候用 reactive？

- 复杂对象，多个相关属性
- 表单数据
- 需要深层响应式的场景

```javascript
// 表单
const form = reactive({
  name: '',
  email: '',
  age: 0
});

// 复杂状态
const store = reactive({
  user: null,
  posts: [],
  loading: false
});
```

### 混合使用

实际项目中经常是混着用的：

```javascript
const state = reactive({
  user: ref(null),        // ref 包对象
  count: ref(0),          // ref 包原始值
  settings: {            // reactive 嵌套
    theme: 'dark',
    lang: 'zh'
  }
});

// 访问时
state.user.value;        // ref 需要 .value
state.settings.theme;    // reactive 直接访问
```

---

## 面试常见问题

### Q1: ref 和 reactive 的区别？

**基础回答：**
> ref 可以包任意类型，通过 .value 访问；reactive 只能包对象，直接访问属性。

**进阶回答：**
> 两者底层实现不同。reactive 基于 Proxy，适合复杂对象；ref 基于 getter/setter，适合原始值。reactive 解构会丢失响应性，因为解构出来的是普通值；ref 只要保持引用就能保持响应性。

### Q2: 为什么 reactive 解构会丢失响应性？

**核心要点：**
- Proxy 代理的是整个对象
- 解构是值拷贝，不是引用传递
- `const { count } = state` 等价于 `const count = state.count`
- 这时候 count 只是一个数字，和 Proxy 没关系了

### Q3: 怎么解决 reactive 解构问题？

- 用 `toRefs` 转换
- 或者直接使用 `ref`
- 避免不必要的解构

---

## 总结

| 特性 | ref | reactive |
|------|-----|----------|
| 数据类型 | 任意 | 仅对象/数组 |
| 访问方式 | `.value` | 直接访问 |
| 解构响应性 | 保持（引用） | 丢失 |
| 底层实现 | getter/setter | Proxy |
| 适用场景 | 原始值、简单状态 | 复杂对象、表单 |

**核心理解：**

1. Vue 3 响应式基于 Proxy + track/trigger
2. reactive 是深层对象代理，ref 是单值包装
3. 解构 reactive 会丢失响应性，推荐用 toRefs
4. 根据场景选择，不要死板

理解这些底层原理，可以让你在写组合式 API 或 Pinia 状态管理时更加自如。

---

## 参考

- [Vue 3 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Proxy - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Vue 3 源码](https://github.com/vuejs/core/tree/main/packages/reactivity)

---

有问题欢迎交流。
