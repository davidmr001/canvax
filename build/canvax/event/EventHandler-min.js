define("canvax/event/EventHandler",["canvax/core/Base","ontouchstart"in window?"canvax/event/touchHandler":"canvax/event/mouseHandler","canvax/display/Point","canvax/event/CanvaxEvent"],function(a,b,c,d){var e=function(a){this.canvax=a,this.curPoints=[new c(0,0)],this.curPointsTarget=[],this._touching=!1,this._draging=!1,this._cursor="default"};return a.creatClass(e,b,{__dispatchEventInChilds:function(b,c){if(!(c||"length"in c))return!1;var e=this,f=!1;return _.each(c,function(c,g){if(c){f=!0;var h=a.copyEvent(new d,b);h.target=h.currentTarget=c||this,h.stagePoint=e.curPoints[g],h.point=h.target.globalToLocal(h.stagePoint),c.dispatchEvent(h)}}),f},_clone2hoverStage:function(a,b){var c=this,d=c.canvax,e=d._hoverStage.getChildById(a.id);e||(e=a.clone(!0),e._transform=a.getConcatenatedMatrix(),canvax._hoverStage.addChildAt(e,0)),e.context.visible=!0,e._dragPoint=a.globalToLocal(c.curPoints[b])},_dragHander:function(a,b,d){var e=this,f=e.canvax,g=f._hoverStage.getChildById(b.id),h=new c(e.curPoints[d].x-g._dragPoint.x,e.curPoints[d].y-g._dragPoint.y);g.context.x=h.x,g.context.y=h.y,b.drag&&b.drag(a);var i=h;"stage"!=b.type&&b.parent&&"stage"!=b.parent.type&&(i=b.parent.globalToLocal(h)),b._notWatch=!0,b.context.x=i.x,b.context.y=i.y,b._notWatch=!1},_dragEnd:function(a,b,c){var d=this,e=d.canvax,f=e._hoverStage.getChildById(b.id);b.context.visible=!0,("mouseout"==a.type||"dragend"==a.type)&&f.destroy()}}),e});