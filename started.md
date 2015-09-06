---
layout: post
title: Canvax五分钟入门
---


## Canvax使用5分钟入门：

canvax重度依赖underscore.js，可以去其underscore.js官网自行下载使用，也可以使用canvax提供的[cdn版本](http://g.tbcdn.cn/thx/canvax/library/underscore.js)。 如果你未引用underscore，canvax则会自动加载一份预设的underscore文件。

canvax采用AMD模块格式编写，如果你的项目使用的是seajs or kissy，可以采用我的[通用模块解决方案](https://github.com/nickli/defineadaptation)做无缝兼容。


### 环境准备

加载require.js，并且配置好canvax的包地址。

```html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Canvax</title>
    <!-- 这里用requirejs来做模块加载器 -->
    <script src="http://requirejs.org/docs/release/2.1.20/minified/require.js"></script>
    <script>
        //这里已我的cdn版本2015.08.12为例
        var canvaxUrl     = "http://g.tbcdn.cn/thx/canvax/2015.08.12/";
        requirejs.config({ paths: {
            canvax : canvaxUrl    
        } });
    </script>
</head>
<body>
</body>
```


### 为Canvax准备一个具备高宽的DOM容器

```html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Canvax</title>
    <!-- 这里用requirejs来做模块加载器 -->
    <script src="http://requirejs.org/docs/release/2.1.20/minified/require.js"></script>
    <script>
        //这里已我的cdn版本2015.08.12为例
        var canvaxUrl     = "http://g.tbcdn.cn/thx/canvax/2015.08.12/";
        requirejs.config({ paths: {
            canvax : canvaxUrl    
        } });
    </script>
</head>
<body>
    <!-- 为Canvax准备一个具备大小（宽高）的Dom -->
    <div id="canvaxTest" style="width:600px;height:300px;"></div>
</body>
```


### 开始绘图，画一个圆

效果如下：

<script src="http://requirejs.org/docs/release/2.1.20/minified/require.js"></script>
<script>
    //这里已我的cdn版本2015.08.12为例
    var canvaxUrl     = "http://g.tbcdn.cn/thx/canvax/2015.08.12/canvax";
    requirejs.config({ paths: {
        canvax : canvaxUrl    
    } });
</script>
<div id="canvaxTest" style="width:600px;height:200px;"></div>
<script>
    require(["canvax/index" , "canvax/shape/Circle"] , function( Canvax , Circle ){
        //在dom树中准备一个具备Layout的容器节点
        var el = document.getElementById("canvaxTest");

        //用这个具备Layout的节点来创建Canvax项目对象
        canvax = new Canvax({
          id : "canvax", //注意，Canvax的世界里面，所有的id都是可选的，但是不能重复。
          el : el 
        });

        //然后就是创建第一个舞台对象Stage,在canvax的世界里，一个Stage就对应着一个canvas
        stage = new Canvax.Display.Stage({ });

        //ok，然后把stage添加到Canvax中管理。然后在stage中添加具体的图形元素
        canvax.addChild(stage);

        //好吧，我们来创建一个圆形，然后添加到stage中，然后给这个圆形添加点事件看看
        var circle = new Circle({
          context : {
            x:100,
            y:100,
            r : 50,
            fillStyle   : 'rgba(220, 20, 60, 0.5)',          // rgba supported
            strokeStyle : 'rgba(220, 20, 60, 0.9)',
            lineWidth   : 2
          }
        });

        //ok然后把这个画好了的圆，添加到舞台中去
        stage.addChild(circle);

    });
</script>


完整代码：


```js
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Canvax</title>
    <!-- 这里用requirejs来做模块加载器 -->
    <script src="http://requirejs.org/docs/release/2.1.20/minified/require.js"></script>
    <script>
        //这里已我的cdn版本2015.08.12为例
        var canvaxUrl     = "http://g.tbcdn.cn/thx/canvax/2015.08.12/canvax";
        requirejs.config({ paths: {
            canvax : canvaxUrl    
        } });
    </script>
</head>
<body>
    <!-- 为Canvax准备一个具备大小（宽高）的Dom -->
    <div id="canvaxTest" style="width:600px;height:300px;"></div>
    <script>
        require(["canvax/index" , "canvax/shape/Circle"] , function( Canvax , Circle ){
            //在dom树中准备一个具备Layout的容器节点
            var el = document.getElementById("canvaxTest");

            //用这个具备Layout的节点来创建Canvax项目对象
            canvax = new Canvax({
              id : "canvax", //注意，Canvax的世界里面，所有的id都是可选的，但是不能重复。
              el : el 
            });

            //然后就是创建第一个舞台对象Stage,在canvax的世界里，一个Stage就对应着一个canvas
            stage = new Canvax.Display.Stage({ });

            //ok，然后把stage添加到Canvax中管理。然后在stage中添加具体的图形元素
            canvax.addChild(stage);

            //好吧，我们来创建一个圆形，然后添加到stage中，然后给这个圆形添加点事件看看
            var circle = new Circle({
              context : {
                x:100,
                y:100,
                r : 50,
                fillStyle   : 'rgba(220, 20, 60, 0.5)',          // rgba supported
                strokeStyle : 'rgba(220, 20, 60, 0.9)',
                lineWidth   : 2
              }
            });

            //ok然后把这个画好了的圆，添加到舞台中去
            stage.addChild(circle);

        });
    </script>
</body>
```
