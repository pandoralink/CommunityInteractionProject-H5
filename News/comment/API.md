为了让后面的维护知道相关的 props 是干什么的，因此写下这个

# <message>

1. rname
   * `<message>` 回复的 `<message>` 的人的名字
   * 默认为 ""（即回复文章或者回复第一级评论）
2. first
   1. 是否为第一级评论
   2. 作用：用来判断是否需要展示 `展开更多回复` 按钮
3. data -> firstFlag
   1. 由于 first 是基本数据类型之一（Boolean，Number，String），在子组件内修改会破坏单一数据流，可能会导致数据的变化无法追踪，Vue 也会报错，不建议在子组件内部修改 Props
   2. 解决方法是在 Props 上再嵌套一层 firstFlag，记录并转换此值