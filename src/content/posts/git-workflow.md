---
title: "Git 工作流程最佳实践"
date: "2026-06-05"
updated: "2026-06-12"
tags: ["Git", "DevOps", "工具"]
summary: "团队协作中推荐的 Git 工作流程和提交规范。"
series: "编程技巧"
---

## 分支策略

推荐使用 **Trunk-Based Development** 或 **GitHub Flow**：

- `main` 分支始终保持可部署状态
- 功能开发在 `feature/xxx` 分支进行
- 通过 Pull Request 合并回 `main`

## 提交规范

使用 Conventional Commits 规范：

```
<type>(<scope>): <description>

feat: 添加用户登录功能
fix: 修复分页计算错误
docs: 更新 README
refactor: 重构认证模块
```

### 常用类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式
- **refactor**: 重构
- **test**: 测试
- **chore**: 构建/工具

## 合并策略

```bash
# Squash merge - 将多个提交压缩为一个
git merge --squash feature/my-feature

# Rebase - 保持线性历史
git rebase main
```

选择哪种取决于团队偏好。Squash merge 适合大多数场景。
