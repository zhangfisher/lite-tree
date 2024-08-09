# Docsify

在`docsify`可以使用`@lite-tree/webcomponent`.

## 引入

在`index.html`中引入`@lite-tree/webcomponent`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LiteTree WebComponent</title>
  <script src="https://cdn.jsdelivr.net/npm/@lite-tree/webcomponent"></script>  // [!code ++]
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: '',
      repo: ''
    }
  </script>
  <!-- Docsify v4 -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>

</body>
</html>
```

## 使用

接下来在`markdown`文件中使用`<lite-tree>`标签即可。

 