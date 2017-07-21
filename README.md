# customizeForm 
javascript, jquery, modernizr, jquery-ellipsis based html form(checkbox, radio, select, file) customize jquery plugin library
This library has applied html5 based web standards and web accessibility. (can html4.01, xhtml1.0)

[한국어 README](README_ko.md)

# Lastest-Version
1.0.3 (2017-07-21)

# Dependency
jQuery >= 1.7.0, modernizr(optional) >= 2.0.6, jquery-ellipsis = 1.1.1

# License
MIT License

# Browser Support
## customizeCheckbox (Checkbox customize)
IE6~11, FF, Chrome, Opera, Safari

## customizeRadio (Radio customize)
IE6~11, FF, Chrome, Opera, Safari

## customizeSelect (Select customize)
IE8~11, FF, Chrome, Opera, Safari

## customizeFile (File customize)
IE6~11, FF, Chrome, Opera, Safari

# Example
You can find examples in the /example/* folder.

## live example
http://silver0r.com/customizeForm/example/checkbox.html

http://silver0r.com/customizeForm/example/radio.html

http://silver0r.com/customizeForm/example/select.html

http://silver0r.com/customizeForm/example/file.html

## customizeCheckbox
An element that encloses the element is required.

```html
<div>
    <input type="checkbox" id="choice1" class="customize_form hide image_type" checked="checked" /><label for="choice1">Choice1</label>
    <input type="checkbox" id="choice2" class="customize_form hide image_type" checked="checked" disabled="disabled" /><label for="choice2">Choice2</label>
    <input type="checkbox" id="choice3" class="customize_form hide image_type" checked="checked" /><label for="choice3">Choice3</label>
</div>
```

```javascript
var $imageType = $('.image_type').customizeCheckbox({       
        backgroundImage: '../css/img/img_checkbox.png',
        backgroundImage2x: '../css/img/img_checkbox@2x.png',
        backgroundSize: '15px auto'
});
```

## customizeRadio
An element that encloses the element is required.

```html
<div>
    <input type="radio" id="choice1" class="customize_form hide image_type" name="type1" checked="checked" /><label for="choice1">Choice1</label>
            <input type="radio" id="choice2" class="customize_form hide image_type" name="type1" disabled="disabled" /><label for="choice2">Choice2</label>
            <input type="radio" id="choice3" class="customize_form hide image_type" name="type1" /><label for="choice3">Choice3</label>
</div>
```

```javascript
var $imageType = $('.image_type').customizeRadio({
        backgroundImage: '../css/img/img_radio.png',
        backgroundImage2x: '../css/img/img_radio@2x.png',
        backgroundSize: '16px auto'
});
```

## customizeSelect
An element that encloses the element is required.

```html
<div>
    <select class="customize_form hide select1">
        <option>선택</option>
        <option value="1">사과</option>
        <option value="2">배</option>
        <option value="3">딸기</option>
        <option value="4">키위</option>
    </select>
</div>
```

```javascript
var $select1 = $('.select1').customizeSelect({
        width                   : 150,
        paddingHorizontal       : 15,
        height                  : 30,
        color                   : '#8f8f92'
});
```

## customizeFile
```html
<input type="file" id="file1" class="customize_form hide file" name="file1" />
```

```javascript
var file1 = $('#file1').customizeFile({
        buttonType: 'text',
        enableInitButton: true
});
```

# Options
## customizeCheckbox
### width
checkbox width (unit: 'px', not need 'px' suffix)

### height
checkbox height (unit: 'px', not need 'px' suffix)

### labelMarginRight
checkbox margin right (unit: 'px', not need 'px' suffix)

### labelPaddingLeft
padding left between label and checkbox (unit: 'px', not need 'px' suffix)

### backgroundColor
checkbox label background color.

### backgroundImage
checkbox label background image. use with type: 'image'

### backgroundImage2x
checkbox label background 2x image. If your browser supports background-size property (css3), use 2x image. use with type: 'image'

### type
checkbox type: image, text (default: image)

### color
text type checkbox default text color.

### selectedColor
text type checkbox selected text color.

### disableColor
text type checkbox disable text color.

### selectedBackgroundColor
text type checkbox selected background color.

### disableBackgroundColor
text type checkbox disable background color.

### borderColor
text type checkbox border color. Default border style is '1px solid borderColor'

### selectedBorderColor
text type checkbox selected border color.

### disableBorderColor
text type checkbox disable border color.

### borderRadius
text type checkbox border radius. (unit: 'px', borderRadius: 5 mean border-radius: '5px', not need 'px' suffix)

### initShow
Display on screen at initialization. (default: true)

### initShowClass
It is used to prevent flickering during initial loading. Delete a specific class for screen display. We recommend 'hide' class.
```css
.customize_form.hide{display:none;}
```

### focusOutline
This option is used for web accessibility focus compliance.

### enableFocusOutline
This option is used for web accessibility focus compliance. (default: true)

### enableFullButton
Use when you need full size buttons like mobile web. (default: false)

## customizeRadio
### width
radio width (unit: 'px', not need 'px' suffix)

### height
radio height (unit: 'px', not need 'px' suffix)

### labelMarginRight
radio margin right (unit: 'px', not need 'px' suffix)

### labelPaddingLeft
padding left between label and radio (unit: 'px', not need 'px' suffix)

### backgroundColor
radio label background color.

### backgroundImage
radio label background image. use with type: 'image'

### backgroundImage2x
radio label background 2x image. If your browser supports background-size property (css3), use 2x image. use with type: 'image'

### type
radio type: image, text (default: image)

### color
text type radio default text color.

### selectedColor
text type radio selected text color.

### disableColor
text type radio disable text color.

### selectedBackgroundColor
text type radio selected background color.

### disableBackgroundColor
text type radio disable background color.

### borderColor
text type radio border color. Default border style is '1px solid borderColor'

### selectedBorderColor
text type radio selected border color.

### disableBorderColor
text type radio disable border color.

### borderRadius
text type radio border radius. (unit: 'px', borderRadius: 5 mean border-radius: '5px', not need 'px' suffix)

### initShow
Display on screen at initialization. (default: true)

### initShowClass
It is used to prevent flickering during initial loading. Delete a specific class for screen display. We recommend 'hide' class.
```css
.customize_form.hide{display:none;}
```

### focusOutline
This option is used for web accessibility focus compliance.

### enableFocusOutline
This option is used for web accessibility focus compliance. (default: true)

### enableFullButton
Use when you need full size buttons like mobile web. (default: false)

## customizeSelect
### width
select width (unit: 'px', not need 'px' suffix)

### height
select height (unit: 'px', not need 'px' suffix)

### paddingHorizontal
select horizontal padding (unit: 'px', paddingHorizontal: 15 mean padding: '0 15px', not need 'px' suffix)

### fontSize
select font size (unit: 'px', not need 'px' suffix)

### color
select default text color

### disableColor
select disable text color

### hoverColor
select hover text color

### initClass
select default cover class. The css class must be predefined. see customize.form.css file.

### focusClass
select focus cover class. The css class must be predefined. see customize.form.css file.

### disableClass
select disable cover class. The css class must be predefined. see customize.form.css file.

### initShow
Display on screen at initialization. (default: true)

### initShowClass
It is used to prevent flickering during initial loading. Delete a specific class for screen display. We recommend 'hide' class.
```css
.customize_form.hide{display:none;}
```

## customizeFile
### buttonType
file type: image, text (default: text)

### buttonText
file text type text. use with buttonText: 'text'

### buttonBackgroundImage
file image type background image. use with buttonText: 'image'

### buttonSpriteClass
If you use the Image sprite technique, apply the class.

### buttonWidth
file button width (unit: 'px', not need 'px' suffix)

### buttonSpacing
button left margin (unit: 'px', not need 'px' suffix)

### buttonBackgroundColor
file button background color. use with buttonText: 'text'

### buttonTextColor
file button text color. use with buttonText: 'text'

### textWidth
file path text width (unit: 'px', not need 'px' suffix)

### textPaddingVertical
file path top and bottom padding (unit: 'px', not need 'px' suffix)

### textPaddingHorizontal
file path left and right padding (unit: 'px', not need 'px' suffix)

### textBorder
file path border.

### verticalSpacing
file wrap button spacing.

### ellipsisPosition
file path ellipsis: middle, tail (default: middle, middle mean 'c:/test/.../test.png', tail mean 'c:/test/123/te...')

### height
file path, file button height (unit: 'px', not need 'px' suffix)

### enableInitButton
Use the File Reset button (default: false)

### initButtonBackgroundImage
file reset button background image.

### initButtonWidth
file reset button width (unit: 'px', not need 'px' suffix)

### initButtonHeight
file reset button width (unit: 'px', not need 'px' suffix)

### initShow
Display on screen at initialization. (default: true)

### initShowClass
It is used to prevent flickering during initial loading. Delete a specific class for screen display. We recommend 'hide' class.
```css
.customize_form.hide{display:none;}
```

### focusOutline
This option is used for web accessibility focus compliance.

### enableFocusOutline
This option is used for web accessibility focus compliance. (default: true)

# Improvement List
## version 1.0.3
 - Add text ellipsis feature in select, 

## version 1.0.2
 - checkbox/radio Change full size button structure for web accessibility compliance.

## version 1.0.1
 - Checkbox Text Type Keyboard Tab Status Bug Fixes.
 
 - Select Improved web accessibility (handles selection so that focus is not released when selecting mouse)
 
 - Improved file accessibility (focus function added)
 
 - Improved checkbox/radio accessibility (focus function added)