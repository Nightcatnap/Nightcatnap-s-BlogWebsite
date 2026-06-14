---
title: "TypeScript 实用技巧"
date: "2026-06-10"
tags: ["TypeScript", "前端"]
summary: "分享一些 TypeScript 日常开发中的实用技巧和最佳实践。"
series: "编程技巧"
series_description: "编程中的各种实用技巧和最佳实践分享。"
---

## 类型体操

TypeScript 的类型系统非常强大，下面是一些实用技巧：

### 1. 使用 `const` 断言

```ts
const colors = ["red", "green", "blue"] as const;
type Color = (typeof colors)[number]; // "red" | "green" | "blue"
```

### 2. 条件类型

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>;      // false
```

### 3. 映射类型

```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

### 4. 模板字面量类型

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type Click = EventName<"click">; // "onClick"
```

## 工具类型

| 类型 | 说明 |
|------|------|
| `Partial<T>` | 所有属性变为可选 |
| `Required<T>` | 所有属性变为必填 |
| `Pick<T, K>` | 选取部分属性 |
| `Omit<T, K>` | 排除部分属性 |
| `Record<K, V>` | 构造对象类型 |

## 总结

掌握这些 TypeScript 技巧可以大大提高代码质量和开发效率。
