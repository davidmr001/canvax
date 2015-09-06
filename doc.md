---
layout: post
title: Canvax Documentation
---


## <span id="virtualContext">Virtual Context</span>

Virtual Context 是Canvax渲染引擎的核心，它是一个经过observe包装过的一个包括了几乎所有canvas.context2D属性和每个元素自有属性的集合，这样，其中任何一个属性的变化就可以主动发出心跳包通知引擎记录下来，然后启动引擎的AnimationFrame在下一帧中绘制所有有属性改变的图形。这样，可以避免用Main loop主循环带来不必要的cpu消耗，也不需要开发在在开发代码的时候手动编写draw方法通知渲染的不友好...

Virtual Context 结构

- width --> 元素的width，默认为0
- height --> 元素的height，默认为0
- x --> 元素的原点x坐标值，默认为0
- y --> 元素的原点y坐标值，默认为0
- scaleX --> x方向缩放，默认为1
- scaleY --> y方向缩放，默认为1
- scaleOrigin --> 缩放的中心原点坐标
  + x --> 默认为0 
  + y --> 默认为0
- rotation --> 旋转角度
- rotateOrigin --> 旋转的中心原点坐标
  + x --> 默认为0
  + y --> 默认为0
- visible --> 元素是否显示，默认为true
- cursor --> hover手势

下面部分为canvas context 2d 的 系统样式。

- fillStyle --> 默认为null
- lineCap --> 默认为null       
- lineJoin  --> 默认为null     
- lineWidth --> 默认为null     
- miterLimit --> 默认为null    
- shadowBlur --> 默认为null    
- shadowColor --> 默认为null   
- shadowOffsetX --> 默认为null 
- shadowOffsetY --> 默认为null 
- strokeStyle --> 默认为null   
- globalAlpha --> 默认为1   
- font --> 默认为null          
- textAlign --> 默认为"left"     
- textBaseline --> 默认为"top"   
- arcScaleX_ --> 默认为null    
- arcScaleY_  --> 默认为null   
- lineScale_ --> 默认为null    
- globalCompositeOperation --> 默认为null 
            


## Canvax

Canvax类负责管理整个项目中的分层cavnas，和心跳机制的实现,捕获到心跳包后，分发到对应的stage(canvas)来绘制对应的改动。同时负责在外围DOM容器上添加事件委托，来对cavnax元素进行事件的派发。

### 属性
   - type --> "canvax"
   - width --> 项目的宽，和外围DOM容器的offsetWidth相等
   - height --> 项目的高，和外围DOM容器的offsetHeight相等
   - preventDefault --> 是否阻止浏览器默认事件的执行
   - el --> canvax项目的DOM容器
### 方法
   - resize --> 重新设置坐标系统 高宽 等。
   - setFrameRate --> 设置渲染帧率
   - getFrameRate --> 获取渲染帧率
   - heartBeat --> 给引擎发送心跳包，参数为空则会无条件渲染所有的分层canvas

## Display

Display是Canvax的抽象对象树结构，DisplayObject定义了所有的元素的基础属性。DisplayObjectContainer继承自DisplayObject，然后定义了做为容器的一些属性和方法，比如它拥有子元素的集合children属性以及一系列操作这个children集合的方法。这样，无状态的canvas便也可以像操作DOM，SVG等一样很方便的来开发。

### DisplayObject

#### 属性
   
   - context --> [virtual context](#virtualContext)
   - id --> 默认随机生成一个id，也可以外部传入
   - stage --> 元素所属的Stage，在添加到到Display Object List中的时候由引擎生成
   - parent --> 元素的父节点，和stage一样，由引擎生成
   - dragEnabled --> 元素是否启用拖动
   - xyToInt --> 是否对xy坐标统一int处理，默认为true，但是有的时候可以由外界用户手动指定是否需要计算为int，因为有的时候不计算比较好，比如，进度图表中，再sector的两端添加两个圆来做圆角的进度条的时候，圆circle不做int计算，才能和sector更好的衔接

#### 方法
   - clone --> 元素克隆 
   - getCurrentWidth --> 获取元素当前的Width
   - getCurrentHeight --> 获取元素当前的Height
   - getStage --> 获取元素的stage
   - localToGlobal --> 把当前元素内坐标系统转换到root根坐标系统
   - globalToLocal --> 和localToGlobal相反，把root根坐标系统转换到当前元素的坐标系统
   - localToTarget --> 和localToGlobal类似，把当前元素的坐标系统转换到目标父元素的坐标系统
   - getIndex --> 获取自己在parent.children中的索引位置
   - toBack --> 元素在z轴方向向下移动
     + @num 参数， 移动的层级，默认把元素移动到最底层
   - toFront --> 元素在z轴方向向上移动
     + @num 参数， 移动的层级，默认把元素移动到最顶层
   - getRect --> 获取元素的矩形范围
   - destroy --> 元素的销毁

     

### DisplayObjectContainer

DisplayObjectContainer继承自DisplayObject

#### 属性

   - children --> 子元素集合

#### 方法
   
   - addChild(@child) --> 添加子元素
     + 参数@child，被add的元素
   - addChildAt(@child , @index) --> 在指定位置添加子元素
     + 参数@child，被add的元素
     + 参数@index，指定添加的索引值
   - removeChild(@child) --> 删除子元素
     + 参数@child，被删除的元素
   - removeChildAt(@child , @index) --> 在指定位置删除子元素
     + 参数@child，被删除的元素
     + 参数@index，指定的索引值
   - removeChildById(@id) --> 根据id删除元素
     + 参数@id，要删除的目标id
   - removeAllChildren() --> 删除所有的子元素
   - destroy() --> 元素销毁，子元素也会被依次销毁
   - getChildById(@id) --> 根据id查找元素，目前只支持在直接子一级children中查找，不支持深度查找
     + 参数@id，查找的目标元素id
   - getChildAt(@index) --> 获取指定位置的元素
     + 参数@index，要查找的指定位置
   - getChildIndex(@child) --> 获取指定子元素的索引值
     + 参数@child，要查找索引的目标子节点
   - setChildIndex(@child , @index) --> 重新设置子节点的index位置
     + 参数@child ， 子节点元素
     + 参数@index ， 新的索引值
   - contains(@child) --> 判断目标节点是否是自己的子节点
     + 参数@child，要判断是否是自己子节点的目标元素，返回bool值
   - getNumChildren() --> 返回所有子节点元素length



### Point

Point类用来创建一个只包含x,y的坐标点

#### 属性
  
  - x
  - y

### Shape

Shape类，是所有自定义图形的父类。

#### 属性

  - type --> "shape"
  - hoverClone --> 是否开启在hover的时候clone一份到active stage 中
  - pointChkPriority --> 在鼠标mouseover到该节点，然后mousemove的时候，是否优先检测该节点

#### 方法

  - dashedLineTo() --> 绘制虚线
  - getRectFormPointList(@context) --> 如果@context中有pointList，则返回pointList四个方向上的边界节点

### Sprite

  简单的容器类，继承自DisplayObjectContainer，可以和在DOM中使用div一样使用sprite

### Stage

  stage 类， 再as3中，stage则代表整个舞台。是唯一的根节点。

  但是再canvax中，因为分层设计的需要。stage 舞台 同样代表一个canvas元素，但是不是整个引擎设计里面唯一的根节点。而是会交由canvax类来统一管理其层级。

#### 属性

  - type --> "stage"
  - context2D --> 对应canvas的context2D


### Text

Text基础自DisplayObject

#### 属性

  - type --> "text"
  - _context --> 元素自定义context，会在初始化创建实例的时候，被父类DisplayObject merge 到实例对象的
Virtual Context中去。
    + fontSize --> 字体大小，默认13
    + fontWeight --> 默认“normal”
    + fontFamily --> 默认“微软雅黑”
    + textDecoration
    + fillStyle 
    + lineHeight

## Shape

Shape自定义图形，继承自Display.Shape类

### Beziercurve

### BrokenLine

### Circle

### Droplet

### Ellipse

### Isogon

### Line

### Path

### Poligon

### Rect

### Sector




## Event







