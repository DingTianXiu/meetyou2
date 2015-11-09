/**
 * ##Slider Controller for WebFlow
 *
 * Allows you to control the WebFlow Slider with custom methods
 *
 * #Usage
 *
 * 		var slider = new W_SLIDER_CONTROLLER( '#element_id' );
 * 		slider.next();
 *		slider.goto( 2 ); // jumps to the second slide
 * 		slider.setup('drag_disabled') // removes the drag-and-slide interaction
 *
 * @author uimanwashere <hello@pabloarmentano.com>
 */
var W_SLIDER_CONTROLLER = function( el ){
	// force it to instance
		//http://jsfiddle.net/vXbLL/
	if (!this instanceof W_SLIDER_CONTROLLER)
			return new W_SLIDER_CONTROLLER( el );

	var $el = $( el );
	if(!$el[0])
		return;

	var _self = this;
	_self.$el = $el;
	_self.$slides = $el.children('.w-slider-mask').children('.w-slide');
	_self.$nav = $el.children('.w-slider-nav').children('.w-slider-dot');
	_self.$el.attr('data-status', 'initialized');

	return this;
};

/**
 * @method count
 * @return {Number}		Qty of slides
 */
W_SLIDER_CONTROLLER.prototype.count = function(){
	return this.$slides.length;
}

/**
 * @method current
 * @return {Number}			Current index [begins at 1]
 */
W_SLIDER_CONTROLLER.prototype.current = function(){
	return this.$nav.filter('.w-active').index() + 1
}

/**
 * Jumps to the pervious slider (cyclic)
 *
 * @method prev
 */
W_SLIDER_CONTROLLER.prototype.prev = function(){
	var tgt =  this.current() - 1;
	if(tgt > this.count())
		tgt = 0;
	else if(tgt < 0)
		tgt = this.count();

	this.goto( tgt );
};

/**
* Jumps to the next slider (cyclic)
*
* @method prev
*/
W_SLIDER_CONTROLLER.prototype.next = function(){
	var tgt = this.current();
	if(tgt > this.count())
		tgt = 0;
	else if(tgt < 0)
		tgt = this.count();

	this.goto( tgt );
};

/**
* Jumps to the specified slider
*
* Triggers W_BEFORE_SLIDE and W_ON_SLIDE for futher interactions
*
* @method prev
* @param	{Number}	index		Desired slide index
*/
W_SLIDER_CONTROLLER.prototype.goto = function( index ){
	$(this.$el).trigger('W_BEFORE_SLIDE');

	$(this.$nav[index]).trigger('tap');

	$(this.$el).trigger('W_ON_SLIDE');
};

/**
 * Allows to configure the slider features
 *
 * @method setup
 * @param	{String}		Desired action string
 */
W_SLIDER_CONTROLLER.prototype.setup = function(action){
	var _self = this;

	switch(action){
		case 'drag_disabled':
			// http://forum.webflow.com/t/disable-dragging-for-sliders/3225/6
			Webflow.push(function () {
				_self.$el.off('swipe');
			});
		break;
		case 'infinite_loop':
			// http://forum.webflow.com/t/disable-dragging-for-sliders/3225/6
			Webflow.push(function () {
				$('.w-slider').off('mousedown.w-slider touchstart.w-slider');
			});
		break;
	}
};