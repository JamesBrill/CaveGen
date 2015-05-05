function Zoomer(canvas) 
{
	this.zoomLevel = 0;
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.lastX = this.canvas.width / 2;
	this.lastY = this.canvas.height / 2;
	this.dragStart;
	this.dragged;
	this.panning = false;
	this.canvas.addEventListener('DOMMouseScroll', function(evt) { 
		this.handleScroll(evt); 
	}.bind(this), false);
	this.canvas.addEventListener('mousewheel', function(evt) { 
		this.handleScroll(evt);
	}.bind(this), false);

	this.canvas.addEventListener('mousedown', function(evt)
	{
		if (this.panning)
		{
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
			this.dragStart = this.context.transformedPoint(this.lastX, this.lastY);
			this.dragged = false;
		}
	}.bind(this), false);

	this.canvas.addEventListener('mousemove', function(evt)
	{
		this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
		this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
		this.dragged = true;
		if (this.dragStart)
		{
			var pt = this.context.transformedPoint(this.lastX, this.lastY);
			this.context.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
			this.redraw();
		}
	}.bind(this), false);

	this.canvas.addEventListener('mouseup', function(evt)
	{
		this.dragStart = null;
	}.bind(this), false);
}

Zoomer.zoomerInstance = null;

Zoomer.getZoomer = function(canvas)
{
	if (Zoomer.zoomerInstance == null)
	{
		Zoomer.zoomerInstance = new Zoomer(canvas);
	}
	var context = Zoomer.zoomerInstance.context;
	Zoomer.zoomerInstance.trackTransforms(context);
	return Zoomer.zoomerInstance;
}

Zoomer.prototype.redraw = function()
{
	var p1 = this.context.transformedPoint(0,0);
	var p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
	this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
	caveView.draw(grid);
	var gridX = caveView.getGridX(this.lastX);
	var gridY = caveView.getGridY(this.lastY);
	caveView.drawCursor(gridX, gridY);
}

Zoomer.prototype.trackTransforms = function(ctx)
{
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };
	
	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	var pt = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
}

Zoomer.prototype.zoom = function(clicks)
{
	var point = this.context.transformedPoint(this.lastX, this.lastY);
	this.context.translate(point.x, point.y);
	var factor = Math.pow(1.1, clicks);
	this.context.scale(factor, factor);
	this.context.translate(-point.x, -point.y);
	this.redraw();
}

Zoomer.prototype.handleScroll = function(evt)
{
	var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
	if (delta)
	{ 
		var newZoomLevel = this.zoomLevel + delta;
		if (newZoomLevel > ZOOM_LIMIT)
		{
			delta -= (newZoomLevel - ZOOM_LIMIT);
		}
		if (newZoomLevel < 0)
		{
			delta -= newZoomLevel;
		}
		this.zoomLevel += delta;
		this.zoom(delta);
	}
	return evt.preventDefault() && false;
}

Zoomer.prototype.transformPixelX = function(pixelX)
{
	var transformedPoint = this.context.transformedPoint(pixelX, 0);
	return transformedPoint.x;
}

Zoomer.prototype.transformPixelY = function(pixelY)
{
	var transformedPoint = this.context.transformedPoint(0, pixelY);
	return transformedPoint.y;
}

Zoomer.prototype.enablePanning = function()
{
	this.panning = true;
}

Zoomer.prototype.disablePanning = function()
{
	this.panning = false;
}

Zoomer.prototype.resetZoomLevel = function()
{
	this.zoomLevel = 0;
}