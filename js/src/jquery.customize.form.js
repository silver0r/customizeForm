/*
select, checkbox, radio, file customize module v1.0.2

(c) 2017 silver0r

dependency: jQuery >= 1.7.0, modernizr(optional) >= 2.0.6, jquery-ellipsis = 1.1.1
MIT License

customizeCheckbox, customizeRadio used modernizr
customizeFile used jquery-ellipsis

-- browser support--------------------------------------
customizeFile support - IE6~11, FF, Chrome, Opera
customizeCheckbox support - IE6~11, FF, Chrome, Opera
customizeRadio support - IE6~11, FF, Chrome, Opera
customizeSelect support - IE8~11, FF, Chrome, Opera
-------------------------------------------------------
-- note -----------------------------------------------
checkbox, radio 긴 버튼 으로 사용하고자 할 때는
display:block, width:-1, labelMarginRight:0 옵션 필요
-------------------------------------------------------

*/
(function (factory) {
    'use strict';
    // AMD
    if(typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.ellipsis.min', 'modernizr-latest'], factory);
    }
    // CommonJS
    else if(typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('jquery.ellipsis.min'), require('modernizr-latest'));
    }
    // Browser globals
    else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var pluginInfo = {
            name    : 'jquery.customize.form',
            version : '1.0'
    };
    
    var methods = {
    		type : {
    			checkbox: 'checkbox',
    			radio: 'radio',
    			select: 'select',
    			file: 'file'
    		},
    		tag : {
    			checkbox: 'input[type=checkbox]',
    			radio: 'input[type=radio]',
    			select: 'select',
    			file: 'input[type=file]'
    		},
    		// element validation check
    		validate : function(types, tags, type) {
    			if(type === types.checkbox || type === types.radio || type === types.select || type === types.file) {
    		    	var flag = true;
    		    	
    		    	$(this).each(function() {
    		    		if(!$(this).is(tags[type])) {
    		    			flag = false;
    		    			
    		    			return false;
    		    		}
    		    	});
    		    	
    		    	if(!flag) {
    		    		$.error('customizeForm - type ' + type + ', The element is not valid in this function.');
    		    	}
    		    	
    		    	return flag;
    			}
    			else {
    				$.error('customizeForm - type ' + type + ', The type is not valid.');
    			}
    		},
    		remove : function(types, type) {
    			if(type === types.checkbox || type === types.radio) {
    			    if($(this).data('enableFullButton')) {
    			        $(this).removeData('enableFullButton').parent().css({
    			            position: ''
    			        });
    			    }
    			    
    				$(this).next('label').off('.customizeForm').removeAttr('style');
        			return $(this).off('.customizeForm').removeAttr('style');
    			}
    			else if(type === types.select) {
    				$(this).prev('.custom_select').off('.customizeForm').remove();
    				return $(this).off('.customizeForm').removeAttr('style');
    			}
    			else if(type === types.file) {
    				var $fileWrap = $(this).closest('.file_wrap');
    				var $element = $(this).off('.customizeForm').clone(true);
    				
    				$element.removeAttr('style').removeAttr('class').insertBefore($fileWrap);
    				$fileWrap.remove();
    				
    				return $element;
    			}
    			else {
    				$.error('customizeCheckbox - type ' + type + ', The type is not valid.');
    			}
    		}
    };
    
    // Select changeSelectValue event attach
    $(document).on('changeSelectValue.customizeForm', function(event, $object, $coverElement) {
        var optionName = $object.find('option:selected').html();
        $coverElement.html(optionName);
    });
    
    // Checkbox, Radio Parent Class
    function ChoiceBox() {
        this._pluginInfo = pluginInfo;
    }
    
    // initialize
    ChoiceBox.prototype.init = function() {
        var that = this;
        var $labelObject = null;
        var $object = null;

        this._draw();

        return this.$element.each(function(index) {
            $object = $(this);
            $labelObject = $object.next('label');

            that._initStatus($object, $labelObject);
            that._event($object, $labelObject);
        });
    };

    // draw structure
    ChoiceBox.prototype._draw = function() {
        var labelCSS = null;
        var choiceBoxCSS = null;
        
        if(this.options.initShow) {
        	this.$element.removeClass(this.options.initShowClass);
        }
        
        // safari browser 1px spalling bug fix
        var bugfix = 1;
        choiceBoxCSS = {
                marginLeft  : bugfix + 'px',
                marginRight : -(this.options.width + bugfix) + 'px',
                width       : this.options.width + 'px',
                height      : this.options.height + 'px',
                zIndex      : 0
        }
        
        if(this.options.type === 'text') {
            labelCSS = {
                    width               : this.options.width + 'px',
                    height              : this.options.height + 'px',
                    lineHeight          : this.options.height + 'px',
                    borderWidth         : '1px',
                    borderStyle         : 'solid',
                    borderColor         : this.options.borderColor,
                    borderRadius        : this.options.borderRadius + 'px',
                    marginRight         : this.options.labelMarginRight + 'px',
                    backgroundColor     : this.options.backgroundColor,
                    color               : this.options.color,
                    display             : 'inline-block',
                    '*display'          : 'inline',
                    '*zoom'             : '1',
                    verticalAlign       : 'middle',
                    textAlign           : 'center',
                    zIndex              : 100,
                    cursor              : 'pointer'
            };
            
            if(this.options.enableFullButton) {
                delete labelCSS.marginRight;
                
                labelCSS.position = 'absolute';
                labelCSS.width = '100%';
                
                delete choiceBoxCSS.width;
                choiceBoxCSS.position = 'absolute';
                
                this.$element.data({
                    'enableFullButton': this.options.enableFullButton
                }).parent().css({
                    position: 'relative'
                });
            }
        }
        // image type
        else {
            labelCSS = {
                    height              : this.options.height + 'px',
                    lineHeight          : this.options.height + 'px',
                    marginRight         : this.options.labelMarginRight + 'px',
                    paddingLeft         : (this.options.width + this.options.labelPaddingLeft) + 'px',
                    backgroundRepeat    : 'no-repeat',
                    backgroundPosition  : '0 0',
                    backgroundColor     : this.options.backgroundColor,
                    display             : 'inline-block',
                    '*display'          : 'inline',
                    '*zoom'             : '1',
                    verticalAlign       : 'middle',
                    zIndex              : 100,
                    cursor              : 'pointer'
            };
            
            if((typeof Modernizr !== 'undefined') && Modernizr.backgroundsize) {
                labelCSS.backgroundImage = 'url("' + this.options.backgroundImage2x + '")';
                labelCSS.backgroundSize = this.options.backgroundSize;
            }
            else {
                labelCSS.backgroundImage = 'url("' + this.options.backgroundImage + '")';
            }
        }
        
        // inline-block IE7 hack properties remove
//        if(this.options.display === 'block') {
//        	labelCSS.display = this.options.display;
//        	
//        	delete labelCSS['*display'];
//        	delete labelCSS['*zoom'];
//        }
        
        // if width equals -1, width properties remove
//        var parseWidth = parseInt(this.options.width);
//        if($.isNumeric(parseWidth) && parseWidth === -1) {
//        	delete labelCSS.width;
//        }

        
        this.$element.css(choiceBoxCSS).next('label').css(labelCSS);
    };
    
    // initialize change element status
    ChoiceBox.prototype._initStatus = function($object, $labelObject) {
        var status = null;
        
        if($object.prop('disabled') && $object.prop('checked')) {
            status = 'on_disabled';
        }
        else if($object.prop('disabled') && !$object.prop('checked')) {
            status = 'off_disabled';
        }
        else if($object.prop('checked')) {
            status = 'on';
        }
        
        if(status !== null) {
            this._changeStatus($labelObject, status);
        }
    };
    
    // change element status
    ChoiceBox.prototype._changeStatus = function($labelObject, status) {
        var labelCSS = null;
        
        if(this.options.type === 'text') {
            var borderColor = null;
            var backgroundColor = null;
            var color = null;
            
            switch(status) {
                case 'off':
                    borderColor = this.options.borderColor;
                    backgroundColor = this.options.backgroundColor;
                    color = this.options.color;
                    
                    break;
                case 'off_hover':
                    borderColor = this.options.borderColor;
                    backgroundColor = this.options.backgroundColor;
                    color = this.options.color;
                    
                    break;
                case 'on':
                    borderColor = this.options.selectedBorderColor;
                    backgroundColor = this.options.selectedBackgroundColor;
                    color = this.options.selectedColor;
                    
                    break;
                case 'on_hover':
                    borderColor = this.options.selectedBorderColor;
                    backgroundColor = this.options.selectedBackgroundColor;
                    color = this.options.selectedColor;
                    
                    break;
                case 'off_disabled':
                    borderColor = this.options.disableBorderColor;
                    backgroundColor = this.options.disableBackgroundColor;
                    color = this.options.disableColor;
                    
                    break;
                case 'on_disabled':
                    borderColor = this.options.disableBorderColor;
                    backgroundColor = this.options.disableBackgroundColor;
                    color = this.options.disableColor;
                    
                    break;
            }
            
            labelCSS = {
                    borderColor         : borderColor,
                    backgroundColor     : backgroundColor,
                    color               : color
            };
        }
        // image type
        else {
            var position = null;
            var yCoordinate = this.options.width + 10;
            
            switch(status) {
                case 'off'          : position = '0 0'; break;
                case 'off_hover'    : position = '0 -' + yCoordinate + 'px'; break;
                case 'on'           : position = '0 -' + yCoordinate * 2 + 'px'; break;
                case 'on_hover'     : position = '0 -' + yCoordinate * 3 + 'px'; break;
                case 'off_disabled' : position = '0 -' + yCoordinate * 4 + 'px'; break;
                case 'on_disabled'  : position = '0 -' + yCoordinate * 5 + 'px'; break;
            }
            
            labelCSS = {
                    backgroundPosition: position
            };
        }
        
        $labelObject.css(labelCSS);
    };
    
    // check element status
    ChoiceBox.prototype._checkStatus = function($object, $labelObject) {
        if(!$object.prop('disabled')) {
            var status = 'off';
            
            if($object.is(':checked')) {
                status = 'on';
            }
            
            this._changeStatus($labelObject, status);
        }
    };

    // check element status hover
    ChoiceBox.prototype._checkStatusWithHover = function($object, $labelObject) {
        if(!$object.prop('disabled')) {
            var status = 'off_hover';
            
            if($object.is(':checked')) {
                status = 'on_hover';
            }
            
            this._changeStatus($labelObject, status);
        }
    };
    
    // Checkbox Class
    function Checkbox($element, options) {
        this.defaults = {
                width                   : 15,                               // checkbox width
                height                  : 15,                               // checkbox heigh
                labelMarginRight        : 10,                               // checkbox margin right
                labelPaddingLeft        : 10,                               // padding left between label and checkbox
                backgroundColor         : '#fff',                           // background color
                backgroundImage         : '../css/img/img_checkbox.png',    // background image source
                backgroundImage2x       : '../css/img/img_checkbox@2x.png', // background image source @2x
                type                    : 'image',                          // checkbox type : image, text (default: image)
                color                   : '#000',                           // text type checkbox text color
                selectedColor           : '#fff',                           // text type checkbox selected text color
                disableColor            : '#838383',                        // text type checkbox disable text color
                selectedBackgroundColor : '#000',                           // text type checkbox selected background color
                disableBackgroundColor  : '#f4f4f4',                        // text type checkbox disable background color
                borderColor             : '#000',                           // text type checkbox border color
                selectedBorderColor     : '#000',                           // text type checkbox selected border color
                disableBorderColor      : '#adb2b5',                        // text type checkbox disable border color
                borderRadius            : 5,                                // text type checkbox border radius
                initShow				: true,								// Display on screen at initialization (default: true)
                initShowClass			: 'hide',							// Delete a specific class for screen display
                focusOutline			: '1px dotted #000',				// element focus outline
                enableFocusOutline		: true,								// element focus outline enable (default: true)
                enableFullButton        : false                             // checkbox full button enable (default: false with option type: text)
        };
        
        this.$element = $element;
        this.options = $.extend({}, this.defaults, options);
        
        return this.init();
    }
    
    Checkbox.prototype = new ChoiceBox();
    
    // check element change trigger
    Checkbox.prototype._changeTrigger = function($object, $labelObject) {
        var status = null;
        
        if(!$object.prop('disabled')) {
            if($object.is(':checked')) {
                status = 'on';
            }
            else {
                status = 'off';
            }
        }
        else {
            if($object.is(':checked')) {
                status = 'on_disabled';
            }
            else {
                status = 'off_disabled';
            }
        }
        
        this._changeStatus($labelObject, status);
    };
    
    // Checkbox event
    Checkbox.prototype._event = function($object, $labelObject) {
        var that = this;

        $labelObject.on('click.customizeForm mouseover.customizeForm', function() {
        	that._checkStatusWithHover($object, $labelObject);
        }).on('mouseleave.customizeForm', function() {
        	that._checkStatus($object, $labelObject);
        });
        
        $object.on('click.customizeForm focus.customizeForm', function() {
        	that._checkStatusWithHover($object, $labelObject);
        }).on('change.customizeForm', function() {
        	that._changeTrigger($object, $labelObject);
        }).on('focus.customizeForm', function() {
        	if(that.options.enableFocusOutline) {
        		$labelObject.css({
        			outline: that.options.focusOutline
        		});
        	}
        }).on('blur.customizeForm', function() {
        	that._checkStatus($object, $labelObject);
        	
        	if(that.options.enableFocusOutline) {
	        	$labelObject.css({
	        		outline: 'none'
	        	});
        	}
        });
    };
    
    // Radio Class
    function Radio($element, options) {
        this.defaults = {
                width                   : 16,                               // radio image width
                height                  : 16,                               // radio image height
                labelMarginRight        : 10,                               // radio margin right
                labelPaddingLeft        : 10,                               // padding left between label and radio
                backgroundColor         : '#fff',                           // background color
                backgroundImage         : '../css/img/img_checkbox.png',    // background image source
                backgroundImage2x       : '../css/img/img_checkbox@2x.png', // background image source @2x
                type                    : 'image',                          // checkbox type : image, text (default: image)
                color                   : '#000',                           // text type radio text color
                selectedColor           : '#fff',                           // text type radio selected text color
                disableColor            : '#838383',                        // text type radio disable text color
                selectedBackgroundColor : '#000',                           // text type radio selected background color
                disableBackgroundColor  : '#f4f4f4',                        // text type radio disable background color
                borderColor             : '#000',                           // text type radio border color
                selectedBorderColor     : '#000',                           // text type radio selected border color
                disableBorderColor      : '#adb2b5',                        // text type radio disable border color
                borderRadius            : 5,                                // text type radio border radius
                initShow				: true,								// Display on screen at initialization (default: true)
                initShowClass			: 'hide',							// Delete a specific class for screen display
                focusOutline			: '1px dotted #000',				// element focus outline
                enableFocusOutline		: true,								// element focus outline enable (default: true)
                enableFullButton        : false                             // checkbox full button enable (default: false with option type: text)
        };
        
        this.$element = $element;
        this.options = $.extend({}, this.defaults, options);
        
        return this.init();
    }
    
    Radio.prototype = new ChoiceBox();
    
    // check element status when radio click
    Radio.prototype._checkStatusWithClick = function($object, $labelObject, objectName) {
        var that = this;
        
        if(!$object.prop('disabled')) {
            var status = null;
            
            $('input[name="' + objectName + '"]').each(function(index) {
                if(!$(this).prop('disabled')) {
                    status = 'off';
                }
                else {
                    status = 'off_disabled';
                }
                
                that._changeStatus($('label[for=' + $(this).attr('id') + ']'), status);
            });
            
            status = 'off_hover';
            
            if($object.is(':checked')) {
                status = 'on_hover';
            }
            
            this._changeStatus($labelObject, status);
        }
    };
    
    // radio element change trigger
    Radio.prototype._changeTrigger = function($object, $labelObject, objectName) {
        var that = this;
        var status = null;
        
        $('input[name="' + objectName + '"]').each(function(index) {
            if(!$(this).prop('disabled') && $(this).is(':checked')) {
                status = 'on';
            }
            else if(!$(this).prop('disabled') && !$(this).is(':checked')) {
                status = 'off';
            }
            else {
                status = 'off_disabled';
            }
            
            that._changeStatus($('label[for=' + $(this).attr('id') + ']'), status);
        });
        
        if(!$object.prop('disabled')) {
            if($object.is(':checked')) {
                this._changeStatus($labelObject, 'on');
            }
        }
        else {
            if($object.is(':checked')) {
                this._changeStatus($labelObject, 'on_disabled');
            }
        }
    };
    
    // Radio event
    Radio.prototype._event = function($object, $labelObject) {
        var that = this;
        var objectName = $object.attr('name');
        
        $labelObject.on('click.customizeForm', function() {
        	that._checkStatusWithClick($object, $labelObject, objectName);
        }).on('mouseover.customizeForm', function() {
        	that._checkStatusWithHover($object, $labelObject);
        }).on('mouseleave.customizeForm', function() {
        	that._checkStatus($object, $labelObject);
        });
        
        $object.on('click.customizeForm', function() {
        	that._checkStatusWithClick($object, $labelObject, objectName);
        }).on('focus.customizeForm', function() {
        	that._checkStatusWithHover($object, $labelObject);
        	
        	if(that.options.enableFocusOutline) {
	        	$labelObject.css({
	        		outline: that.options.focusOutline
	        	});
        	}
        }).on('blur.customizeForm', function() {
        	that._checkStatus($object, $labelObject);
        	
        	if(that.options.enableFocusOutline) {
	        	$labelObject.css({
	        		outline: 'none'
	        	});
        	}
        }).on('change.customizeForm', function() {
        	that._changeTrigger($object, $labelObject, objectName);
        });
    };
    
    // File Class
    function File($element, options) {
        this._pluginInfo = pluginInfo;
        
        this.defaults = {
            buttonType                  : 'text',                               // button type: text, image, bg_sprite (default: text)
            buttonText                  : '파일열기',                            // button type = 'text', set button Text
            buttonBackgroundImage       : '../css/img/img_find_btn01.jpg',      // button image source
            buttonSpriteClass           : 'btn_file01',                         // button sprite class(bg_sprite only)
            buttonWidth                 : 70,                                   // button width
            buttonSpacing               : 10,                                   // button left margin
            buttonBackgroundColor       : '#707070',                            // button type = 'text', set button background color
            buttonTextColor             : '#fff',                               // button type = 'text', set button text color
            textWidth                   : 190,                                  // chosen file name box size
            textPaddingVertical         : 0,                                    // file name box top and bottom padding
            textPaddingHorizontal       : 5,                                    // file name box left and right padding
            textBorder                  : '1px #c8c8c8 solid',                  // file name box border
            verticalSpacing             : 10,                                   // each file wrap element spacing
            ellipsisPosition            : 'middle',                             // text ellipsis: middle, tail
            height                      : 30,                                   // element common height
            enableInitButton            : false,                                // Init button enable (default: false)
            initButtonBackgroundImage   : '../css/img/img_close_btn01.png',     // Init button background image
            initButtonWidth				: 12,									// Init button image width
            initButtonHeight			: 12,									// Init button image height
            initShow					: true,									// Display on screen at initialization (default: true)
            initShowClass				: 'hide',								// Delete a specific class for screen display
            focusOutline				: '1px dotted #000',					// element focus outline
            enableFocusOutline			: true									// element focus outline enable (default: true)							
        };
        
        this._$oldElement = $element;
        this.options = $.extend({}, this.defaults, options);
        
        return this.init();
    }
    
    // File initialize
    File.prototype.init = function() {
        this._replaceHTML();
        this._draw();
        this._event();
        
        return this.$element;
    };
    
    // remove <input type="file" /> and make new structure
    File.prototype._replaceHTML = function() {
        var html = '<div class="file_wrap"><div class="file_text"><div class="ellipsis"></div></div><div class="btn_customize_file">';
        
        if(this.options.buttonType === 'text' || this.options.buttonType === 'bg_sprite') {
            html += '<span class="text">' + this.options.buttonText + '</span>';
        }
        
        html += '<input type="file" class="customizeFile" name="' + this._$oldElement.attr('name') + '" id="' + this._$oldElement.attr('id') + '" /></div></div>';
        
        var $wrapElement = this._$oldElement.before(html).prev();
        $wrapElement.next().remove();
        
        if(this.options.enableInitButton) {
            $wrapElement.children('.file_text').append('<a class="btn_file_init" href="javascript:;" title="file clear"><img src="' + this.options.initButtonBackgroundImage + '" alt="close" /></a>');
        }
        
        this._$wrapElement = $wrapElement;
    };
    
    // draw new structure
    File.prototype._draw = function() {
        var $element = this._$wrapElement.css({
            width               : (this.options.textWidth + this.options.buttonWidth + this.options.buttonSpacing + (this.options.textPaddingHorizontal * 2)) + 'px',
            height              : this.options.height + 'px',
            lineHeight          : this.options.height + 'px',
            marginBottom        : this.options.verticalSpacing + 'px'
        }).children('div').css({
            height              : this.options.height + 'px',
            lineHeight          : this.options.height + 'px'
        }).closest('.file_wrap').children('.file_text').css({
            float               : 'left',
            width               : (this.options.textWidth - 2) + 'px',
            height              : (this.options.height - 2) + 'px',
            padding             : this.options.textPaddingVertical + ' ' + this.options.textPaddingHorizontal + 'px',
            border              : this.options.textBorder,
            position            : 'relative'
        }).children('.ellipsis').css({
            wordBreak           : 'break-all',   // installation_status1211234567890.xml 같은 파일명의 버그 막기 위해 사용
            float				: 'left'
        }).closest('.file_wrap').children('.btn_customize_file').css({
            float               : 'left',
            width               : this.options.buttonWidth + 'px',
            height              : this.options.height + 'px',
            marginLeft          : this.options.buttonSpacing + 'px',
            display             : 'inline',
            position            : 'relative',
            overflow            : 'hidden'
        }).find('input[type="file"]').css({
            position            : 'absolute',
            top                 : 0,
            left                : '-90px',
            zIndex              : 100,
            width               : (this.options.buttonWidth + 90) + 'px',
            height              : this.options.height + 'px',
            opacity             : 0,
            filter              : 'alpha(opacity=0)',
            '-ms-filter'        : '“alpha(opacity=0)”',
            '-moz-opacity'      : 0,
            '-khtml-opacity'    : 0,
            zoom                : 1,
            cursor              : 'pointer',
            border              : '0'            
        });
        
        var $elementParent = $element.parent();
        
        if(this.options.buttonType === 'text') {
            $elementParent.css({
                background      : this.options.buttonBackgroundColor,
                color           : this.options.buttonTextColor
            }).find('.text').css({
                position        : 'absolute',
                top             : 0,
                left            : 0,
                zIndex          : 100,
                display         : 'inline-block',
                width           : this.options.buttonWidth + 'px',
                textAlign       : 'center'
            });
        }
        else if(this.options.buttonType === 'bg_sprite') {
            $elementParent.css({
                color           : this.options.buttonTextColor
            }).find('.text').css({
                position        : 'absolute',
                top             : 0,
                left            : 0,
                zIndex          : 100,
                display         : 'inline-block',
                width           : this.options.buttonWidth + 'px',
                textAlign       : 'center'
            }).addClass(this.options.buttonSpriteClass);
        }
        else if(this.options.buttonType === 'image') {
            $elementParent.css({
                background      : 'url("' + this.options.buttonBackgroundImage + '") no-repeat'
            });
        }
        
        if(this.options.enableInitButton) {
            var $fileText = $element.closest('.file_wrap').children('.file_text');
            var textHeight = $fileText.innerHeight();
            
            $fileText.children('.ellipsis').css({                
                float				: 'left',
                width				: (this.options.textWidth - 2 - this.options.initButtonWidth) + 'px'
            }).next('.btn_file_init').css({
                width				: this.options.initButtonWidth + 'px',
                height				: this.options.initButtonHeight + 'px',
                float               : 'left',
                textAlign       	: 'center',
                marginTop			: (textHeight - this.options.initButtonHeight) / 2 + 'px',
                display				: 'none'
            }).children('img').css({
                verticalAlign       : 'top',
                width				: this.options.initButtonWidth + 'px',
                height				: this.options.initButtonHeight + 'px'
            });
        }
        
        this.$element = $element;
    };
    
    // File event
    File.prototype._event = function() {
        var that = this;
        
        this.$element.on('change.customizeForm', function() {
        	var $fileText = $(this).closest('.file_wrap').children('.file_text');
        	
        	$fileText.children('.ellipsis').text($(this).val()).attr('title', $(this).val()).ellipsis({
        		position: that.options.ellipsisPosition
        	});
        	
        	if(that.options.enableInitButton) {
        		var $btnFileInit = $fileText.children('.btn_file_init');
        		
        		if($(this).val() === null || $(this).val() === '') {
        			$btnFileInit.hide();
        		}
        		else {
        			$btnFileInit.show();
        		}
        	}
        }).on('focus.customizeForm', function() {
        	if(that.options.enableFocusOutline) {
        		that.$element.closest('.btn_customize_file').css({
        			outline: that.options.focusOutline
        		});
        	}
        }).on('blur.customizeForm', function() {
        	if(that.options.enableFocusOutline) {
	        	that.$element.closest('.btn_customize_file').css({
	        		outline: 'none'
	        	});
        	}
        });
        
        if(this.options.enableInitButton) {
            this.$element.closest('.file_wrap').children('.file_text')
                    .children('.btn_file_init').on('click', function() {
                $(this).closest('.file_text').children('.ellipsis').text('');

                // input type file clear
                var $file = $(this).closest('.file_wrap').children('.btn_customize_file')
                        .children('.customizeFile');
                $file.val('');
                $file.val('').replaceWith( $file.clone(true) );
                
                $(this).hide();
            });
        }
    };
    
    // Select Class
    function Select(element, options) {
        this._pluginInfo = pluginInfo;
        
        this.defaults = {
                width                   : 90,                           // element width
                paddingHorizontal       : 15,                           // element horizontal padding (0 'X'px) 
                height                  : 30,                           // element height
                fontSize                : 12,                           // element font-size
                color                   : '#a0a0a0',                    // element color
                disableColor            : '#d0d0d1',                    // element disable color
                hoverColor              : '#fc5d2a',                    // element hover color
                initClass               : 'custom-form-select01',       // element init class
                focusClass              : 'custom-form-focused01',      // element focus class
                disableClass            : 'custom-form-disabled01',     // element disable class
                initShow				: true,                         // Display on screen at initialization (default: true)    
                initShowClass			: 'hide'                        // Delete a specific class for screen display
        };
        
        this.$element = element;
        this.options = $.extend({}, this.defaults, options);
        
        return this.init();
    }
    

    // Select initialize
    Select.prototype.init = function() {
        var that = this;

        this._draw();
        
        return this.$element.each(function(index) {
            var $object = $(this);
            var $coverElement = $object.prev('.custom_select');
            var status = 'blur';
            
            that._changeStatus($object, $coverElement, status);
            that._event($object, $coverElement);
        });
    };
    
    // draw structure
    Select.prototype._draw = function() {
    	
    	if(this.options.initShow) {
        	this.$element.removeClass(this.options.initShowClass);
        }
    	
        var $coverElements = $('<span></span>').css({
            color               : this.options.color,
            width               : this.options.width + 'px',
            padding             : '0 ' + this.options.paddingHorizontal + 'px',
            height              : this.options.height + 'px',
            lineHeight          : this.options.height + 'px',
            fontSize            : this.options.fontSize + 'px',
            overflow            : 'hidden', 
            position            : 'absolute'
        }).addClass('custom_select');
        
        this.$element.css({
            width               : this.options.width + (this.options.paddingHorizontal * 2) + 'px',
            height              : this.options.height + 'px',
            lineHeight          : (this.options.height - 4) + 'px',     // instead of line-height(safari browser don't work height)
            position            : 'relative',
            opacity             : 0,
            filter              : 'alpha(opacity=0)',
            '-ms-filter'        : 'alpha(opacity=0)',
            '-moz-opacity'      : 0,
            '-khtml-opacity'    : 0,
            zIndex              : 100
        }).before($coverElements);
    };
    
    // change select status
    Select.prototype._changeStatus = function($object, $coverElement, status) {
        var coverClass = this.options.initClass;
        var coverColor = this.options.color;
        
        if($object.prop('disabled')) {
            coverClass = this.options.disableClass;
            coverColor = this.options.disableColor;
        }
        else {
        	switch(status) {
	            case 'focus':
	            	coverClass = this.options.focusClass;
	                coverColor = this.options.hoverColor;
	                
	                break;
	            case 'blur':
	            	coverClass = this.options.initClass;
	                coverColor = this.options.color;
	                
	                break;
	        }
        }
        
        $coverElement.removeClass(this.options.initClass).removeClass(this.options.focusClass)
        .removeClass(this.options.disableClass)
        .addClass(coverClass).text($object.find(':selected').html()).css({
            color: coverColor
        });
    };
    
    // Select event
    Select.prototype._event = function($object, $coverElement) {
        var that = this;
        
        $object.on('click.customizeForm keyup.customizeForm', function () {
        	$(document).trigger('changeSelectValue.customizeForm', [$object, $coverElement]);
        }).on('focus.customizeForm', function() {
        	var status = 'focus';
        	that._changeStatus($object, $coverElement, status);
            
            $(document).trigger('changeSelectValue.customizeForm', [$object, $coverElement]);
        }).on('blur.customizeForm', function() {
        	var status = 'blur';
        	that._changeStatus($object, $coverElement, status);
        }).on('change.customizeForm', function( event, changeFlag ) {
        	var status = 'focus';
        	if(changeFlag) {
        		status = 'blur';
        	}
        	that._changeStatus($object, $coverElement, status);
        	
        	$(document).trigger('changeSelectValue.customizeForm', [$object, $coverElement]);
        });
    };
    
    $.fn.customizeCheckbox = function(options) {
    	if(methods.validate.apply(this, [methods.type, methods.tag, methods.type.checkbox])) {
    		if(methods[options]) {
    			return methods[options].apply(this, [methods.type, methods.type.checkbox]);
    		}
    		else if(typeof options === 'object' || !options) {
    			return new Checkbox($(this), options);
    		}
    		else {
    			$.error('customizeCheckbox - options ' + options + ', The option is not valid.');
    		}
    	}
    };
    
    $.fn.customizeRadio = function(options) {
    	if(methods.validate.apply(this, [methods.type, methods.tag, methods.type.radio])) {
    		if(methods[options]) {
    			return methods[options].apply(this, [methods.type, methods.type.radio]);
    		}
    		else if(typeof options === 'object' || !options) {
    			return new Radio($(this), options);
    		}
    		else {
    			$.error('customizeRadio - options ' + options + ', The option is not valid.');
    		}
    	}
    };
    
    $.fn.customizeFile = function(options) {
    	if(methods.validate.apply(this, [methods.type, methods.tag, methods.type.file])) {
	    	if(methods[options]) {
				return methods[options].apply(this, [methods.type, methods.type.file]);
			}
	    	else if(typeof options === 'object' || !options) {
	    		return new File($(this), options);
			}
			else {
				$.error('customizeFile - options ' + options + ', The option is not valid.');
			}
    	}
    };
    
    $.fn.customizeSelect = function(options) {
    	if(methods.validate.apply(this, [methods.type, methods.tag, methods.type.select])) {
	    	if(methods[options]) {
				return methods[options].apply(this, [methods.type, methods.type.select]);
			}
	    	else if(typeof options === 'object' || !options) {
	    		return new Select($(this), options);
			}
			else {
				$.error('customizeSelect - options ' + options + ', The option is not valid.');
			}
    	}
    };
}));