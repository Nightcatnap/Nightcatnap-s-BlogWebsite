## `sorted(iterable, key=None, reverse=False)` 详解

`sorted()` 是 ==Python 内置的高阶函数==，它接收一个可迭代对象，返回一个新的已排序列表（原对象不变）。其完整签名为：

```python
sorted(iterable, *, key=None, reverse=False)
```

> **注意**：`*` 表示后面的参数必须用关键字传递（Python 3 引入）。

### 1. 基本参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `iterable` | 可迭代对象 | 要排序的序列（如列表、元组、字符串、字典等） |
| `key` | 函数 或 `None` | 作用于每个元素的**变换函数**，排序依据为该函数的返回值；`None` 表示直接比较元素本身 |
| `reverse` | `bool` | `False`（默认）升序，`True` 降序 |

**返回**：一个新的 `list`，包含排序后的所有元素。

---

### 2. 最简单的使用

```python
# 数字排序
sorted([3, 1, 4, 1, 5])          # [1, 1, 3, 4, 5]
sorted([3, 1, 4, 1, 5], reverse=True)  # [5, 4, 3, 1, 1]

# 字符串排序（默认按字典序）
sorted(['banana', 'apple', 'Cherry'])  # ['Cherry', 'apple', 'banana'] 注意大写字母排在小写之前！

# 对元组排序
sorted((3, 1, 2))                # [1, 2, 3]

# 对字典排序（返回排好序的键列表）
d = {'c': 3, 'a': 1, 'b': 2}
sorted(d)                        # ['a', 'b', 'c']
```

---

### 3. `key` 参数：自定义排序依据

`key` 函数接收一个元素，返回一个用于比较的值（称为“排序键”）。Python 对每个元素调用 `key` 一次并缓存结果（Schwartzian transform 模式），因此即使元素很多也高效。

#### 3.1 使用 `lambda` 表达式

```python
# 按字符串长度排序
words = ['apple', 'pie', 'banana', 'kiwi']
sorted(words, key=lambda w: len(w))   # ['pie', 'kiwi', 'apple', 'banana']

# 按元组的第二个元素排序
pairs = [(1, 'b'), (2, 'a'), (3, 'c')]
sorted(pairs, key=lambda x: x[1])     # [(2, 'a'), (1, 'b'), (3, 'c')]

# 忽略大小写排序
names = ['Bob', 'alice', 'Charlie']
sorted(names, key=lambda s: s.lower())  # ['alice', 'Bob', 'Charlie']
```

#### 3.2 使用 `operator` 模块的函数

`operator.itemgetter` 和 `operator.attrgetter` 提供更高效、更简洁的取值方式。

```python
from operator import itemgetter, attrgetter

# itemgetter: 用于序列/映射对象
students = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
sorted(students, key=itemgetter(1))          # 按分数排序，等价于 lambda x: x[1]
sorted(students, key=itemgetter(0))          # 按姓名排序

# 支持多级排序：先按分数降序，再按姓名升序
sorted(students, key=itemgetter(1, 0), reverse=True) # 注意 reverse 影响所有字段

# attrgetter: 用于对象属性
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
s1 = Student('Alice', 85)
s2 = Student('Bob', 92)
s_list = [s1, s2]
sorted(s_list, key=attrgetter('grade'))  # 按 grade 排序
```

#### 3.3 使用自定义函数（或内置函数）

```python
# 使用 str.lower 作为 key
sorted(['bob', 'Alice', 'charlie'], key=str.lower)  # ['Alice', 'bob', 'charlie']

# 使用绝对值排序
sorted([-5, 2, -8, 3], key=abs)          # [2, 3, -5, -8]

# 使用布尔值（将 True 视为 1，False 视为 0）
data = [True, False, True, False]
sorted(data)                             # [False, False, True, True]
sorted(data, key=lambda x: not x)        # 反转布尔顺序
```

---

### 4. 多级排序

#### 方法一：`key` 返回元组

Python 对元组执行**字典序**比较：先比较第一个元素，若相等则比较第二个，依此类推。

```python
students = [('Alice', 85, 'CS'), ('Bob', 85, 'Math'), ('Charlie', 78, 'CS')]
# 先按分数降序，分数相同再按姓名升序
sorted(students, key=lambda s: (-s[1], s[0]))
# 输出：[('Alice', 85, 'CS'), ('Bob', 85, 'Math'), ('Charlie', 78, 'CS')]

# 注意：分数降序利用了负号技巧（只能用于数字）
```

#### 方法二：多次排序（稳定排序）

Python 的排序是**稳定**的（保留相等元素的原始顺序）。因此可以先按次要键排序，再按主要键排序。

```python
students = [('Alice', 85), ('Bob', 92), ('Charlie', 78), ('Diana', 85)]
# 先按分数升序
students_sorted_by_grade = sorted(students, key=itemgetter(1))
# 再按姓名降序（稳定排序）
result = sorted(students_sorted_by_grade, key=itemgetter(0), reverse=True)
# 最终效果：姓名降序，姓名相同时按原始顺序（即分数升序）
```

---

### 5. 与 `list.sort()` 的区别

| 特性 | `sorted(iterable)` | `list.sort()` |
|------|-------------------|----------------|
| 返回值 | 返回**新列表** | 返回 `None`，原地修改 |
| 适用范围 | 任何可迭代对象 | 仅 `list` 对象 |
| 内存 | 需要额外复制 | 不复制（原地） |
| 性能 | 稍慢（需复制） | 较快 |

```python
# list.sort 示例
lst = [3,1,2]
lst.sort()          # lst 变为 [1,2,3]，返回 None
sorted(lst)         # 返回 [1,2,3]，lst 不变
```

---

### 6. 高级技巧与陷阱

#### 6.1 `reverse` 与 `key` 的相互作用

`reverse` 控制最终顺序，而不是对 `key` 返回值取反。因此：

```python
# 按分数降序的两种写法等价：
sorted(students, key=lambda s: s[1], reverse=True)
sorted(students, key=lambda s: -s[1])   # 仅限数字
```

#### 6.2 对字典进行值排序

```python
d = {'apple': 3, 'banana': 1, 'cherry': 2}
# 按值排序，返回键列表
sorted(d, key=d.get)                # ['banana', 'cherry', 'apple']
# 按值排序，返回 (键, 值) 元组列表
sorted(d.items(), key=lambda item: item[1])  # [('banana',1), ('cherry',2), ('apple',3)]
```

#### 6.3 处理 `None` 值

如果元素中有 `None` 且希望将其放到开头或结尾，可以自定义 `key`：

```python
data = [5, None, 3, None, 8]
# 将 None 视为 -inf（放开头）
sorted(data, key=lambda x: (x is None, x))
# 输出：[None, None, 3, 5, 8]
# 解释：x is None 为 True(1) 或 False(0)，元组比较先看这个，所以 None 排前面

# 将 None 视为 +inf（放末尾）
sorted(data, key=lambda x: (x is not None, x))
# 输出：[3, 5, 8, None, None]
```

#### 6.4 排序带有 `__getitem__` 的自定义对象

只要对象支持索引，`itemgetter` 就有效。对于字典也可用 `key=d.__getitem__`。

#### 6.5 `key` 函数的副作用

`key` 函数在每个元素上只调用一次，结果被缓存。因此即使函数有副作用（如打印），也只会执行一次。

```python
def f(x):
    print(f"f({x}) called")
    return len(x)

words = ['a', 'ab', 'abc']
sorted(words, key=f)
# 输出：
# f(a) called
# f(ab) called
# f(abc) called
# 而不是排序过程中反复调用
```

---

-------------
### 7. 实战示例

#### 示例1：按文件扩展名排序文件名

```python
files = ['cat.jpg', 'dog.png', 'script.py', 'doc.txt', 'notes.txt']
sorted(files, key=lambda f: f.split('.')[-1])
# 输出：['cat.jpg', 'dog.png', 'script.py', 'doc.txt', 'notes.txt'] （txt 在一起）
```

#### 示例2：按中文拼音排序（需 `pypinyin` 库）

```python
# pip install pypinyin
from pypinyin import pinyin, lazy_pinyin
words = ['苹果', '香蕉', '橙子']
sorted(words, key=lambda w: lazy_pinyin(w)[0])  # 按拼音首字母排序
```

#### 示例3：复杂对象的嵌套属性排序

```python
class Person:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address

people = [Person('Alice', 30, Address('Z', 123)),
          Person('Bob', 25, Address('A', 456)), ...]

# 先按地址的城市名升序，再按年龄降序
sorted(people, key=lambda p: (p.address.city, -p.age))
```

#### 示例4：`functools.cmp_to_key` 用于旧式比较函数

如果你有一个定义了 `__cmp__` 的比较函数（返回 -1/0/1），可以用 `cmp_to_key` 转换：

```python
from functools import cmp_to_key

def compare(a, b):
    # 自定义比较逻辑：返回负数、0、正数
    return (a % 3) - (b % 3)   # 按模 3 的余数排序

nums = [5, 1, 9, 4]
sorted(nums, key=cmp_to_key(compare))  # [9, 1, 4, 5]  （模3余数：0,1,1,2）
```

> 除非必须使用旧式比较函数，否则推荐使用 `key`，性能更好。

---

### 8. 常见错误与解答

- **`TypeError: '<' not supported between instances of 'str' and 'int'`**  
  元素类型不一致。解决方法：确保所有元素可比较，或使用 `key` 将它们转换为一致类型。

- **忘记 `key` 返回可比较的值**  
  例如 `key=lambda x: x` 没问题，但如果元素是元组且需要按第二个元素排序，必须写 `key=lambda x: x[1]`。

- **误用 `reverse` 于多级元组**  
  `reverse=True` 会反转整个元组比较结果，而不是单独反转某个字段。如需部分字段反向，请用负号或多次排序。

---

### 总结

- `sorted` 是灵活强大的排序工具，适用于任何可迭代对象。
- `key` 参数是实现自定义排序的关键，可以传入 `lambda`、`operator.itemgetter`、`attrgetter` 等。
- 利用元组键或稳定排序可以轻松实现多级排序。
- 对于列表原地排序，优先使用 `list.sort()`，其余情况用 `sorted`。

理解好 `key` 的设计思想（**数据转换后比较**）后，你会发现几乎所有排序需求都能优雅解决。