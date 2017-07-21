# customizeForm 
javascript, jquery, modernizr, jquery-ellipsis 기반 html form(checkbox, radio, select, file) 커스터마이즈 jquery plugin 라이브러리
이 라이브러리는 html5 기반 웹표준과 웹 접근성을 적용했습니다. (html4.01, xhtml1.0 사용가능)

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
/example/* 폴더에서 예제를 확인하실 수 있습니다.

## live example
http://silver0r.com/customizeForm/example/checkbox.html

http://silver0r.com/customizeForm/example/radio.html

http://silver0r.com/customizeForm/example/select.html

http://silver0r.com/customizeForm/example/file.html

## customizeCheckbox
해당 요소를 감싸는 요소가 필요합니다.

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
해당 요소를 감싸는 요소가 필요합니다.

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
해당 요소를 감싸는 요소가 필요합니다.

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
checkbox width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### height
checkbox height (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### labelMarginRight
checkbox margin right (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### labelPaddingLeft
checkbox 와 label 간 padding left (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### backgroundColor
checkbox label background color.

### backgroundImage
checkbox label background image. type: 'image' 와 함께 사용해야 합니다.

### backgroundImage2x
checkbox label background 2x image. 브라우저에서 background-size 속성 (css3)을  지원하면 2배 이미지로 적용됩니다. type: 'image' 와 함께 사용해야 합니다.

### type
checkbox type: image, text (default: image)

### color
text type checkbox 기본 텍스트 색상.

### selectedColor
text type checkbox selected text color.

### disableColor
text type checkbox disable text color.

### selectedBackgroundColor
text type checkbox selected background color.

### disableBackgroundColor
text type checkbox disable background color.

### borderColor
text type checkbox border color. 기본 border 스타일은 '1px solid borderColor' 입니다.

### selectedBorderColor
text type checkbox selected border color.

### disableBorderColor
text type checkbox disable border color.

### borderRadius
text type checkbox border radius. (unit: 'px', borderRadius: 5 옵션은 border-radius: '5px' 으로 적용됩니다. 뒤에 'px' 을 붙일 필요가 없습니다.)

### initShow
초기 로딩 시 보여지게 합니다. (default: true)

### initShowClass
초기 로딩 중 깜빡임을 방지하는데 사용합니다. 화면 표시를 위해 특정 클래스를 삭제합니다. 'hide' 클래스 사용을 권장합니다.
```css
.customize_form.hide{display:none;}
```

### focusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다.

### enableFocusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다. (default: true)

### enableFullButton
모바일 웹과 같이 전체 사이즈 버튼이 필요할 경우 사용합니다. (default: false)

## customizeRadio
### width
radio width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### height
radio height (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### labelMarginRight
radio margin right (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### labelPaddingLeft
radio 와 label 간 padding left (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### backgroundColor
radio label background color.

### backgroundImage
radio label background image. type: 'image' 와 함께 사용해야 합니다.

### backgroundImage2x
radio label background 2x image. 브라우저에서 background-size 속성 (css3)을  지원하면 2배 이미지로 적용됩니다. type: 'image' 와 함께 사용해야 합니다.

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
text type radio border color. 기본 border 스타일은 '1px solid borderColor' 입니다.

### selectedBorderColor
text type radio selected border color.

### disableBorderColor
text type radio disable border color.

### borderRadius
text type radio border radius. (unit: 'px', borderRadius: 5 옵션은 border-radius: '5px' 으로 적용됩니다. 뒤에 'px' 을 붙일 필요가 없습니다.)

### initShow
초기 로딩 시 보여지게 합니다. (default: true)

### initShowClass
초기 로딩 중 깜빡임을 방지하는데 사용합니다. 화면 표시를 위해 특정 클래스를 삭제합니다. 'hide' 클래스 사용을 권장합니다.
```css
.customize_form.hide{display:none;}
```

### focusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다.

### enableFocusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다. (default: true)

### enableFullButton
모바일 웹과 같이 전체 사이즈 버튼이 필요할 경우 사용합니다. (default: false)

## customizeSelect
### width
select width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### height
select height (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### paddingHorizontal
select horizontal padding (unit: 'px', paddingHorizontal: 15 은 padding: '0 15px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### fontSize
select font size (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### color
select default text color

### disableColor
select disable text color

### hoverColor
select hover text color

### initClass
select default cover class. 이 클래스는 미리 정의 되어야 합니다. customize.form.css 파일을 참고해주세요.

### focusClass
select focus cover class. 이 클래스는 미리 정의 되어야 합니다. customize.form.css 파일을 참고해주세요.

### disableClass
select disable cover class. 이 클래스는 미리 정의 되어야 합니다. customize.form.css 파일을 참고해주세요.

### initShow
초기 로딩 시 보여지게 합니다. (default: true)

### initShowClass
초기 로딩 중 깜빡임을 방지하는데 사용합니다. 화면 표시를 위해 특정 클래스를 삭제합니다. 'hide' 클래스 사용을 권장합니다.
```css
.customize_form.hide{display:none;}
```

## customizeFile
### buttonType
file type: image, text (default: text)

### buttonText
file text type text. buttonText: 'text' 와 함께 사용해야 합니다.

### buttonBackgroundImage
file image type background image. buttonText: 'image' 와 함께 사용해야 합니다.

### buttonSpriteClass
이미지 스프라이트 기법을 사용하는 경우 클래스를 적용할 수 있습니다.

### buttonWidth
file button width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### buttonSpacing
button left margin (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### buttonBackgroundColor
file button background color. buttonText: 'text' 와 함께 사용해야 합니다.

### buttonTextColor
file button text color. buttonText: 'text' 와 함께 사용해야 합니다.

### textWidth
file path text width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### textPaddingVertical
file path top and bottom padding (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### textPaddingHorizontal
file path left and right padding (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### textBorder
file path border.

### verticalSpacing
file 전체 wrap의 하단 여백.

### ellipsisPosition
file path 말줄임 처리: middle, tail (default: middle, middle 은 'c:/test/.../test.png', tail 은 'c:/test/123/te...')

### height
file path, file button height (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### enableInitButton
File 초기화 버튼 (default: false)

### initButtonBackgroundImage
file 초기화 버튼 background image.

### initButtonWidth
file 초기화 버튼 width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### initButtonHeight
file 초기화 버튼 width (unit: 'px', 뒤에 'px' 을 붙일 필요가 없습니다.)

### initShow
초기 로딩 시 보여지게 합니다. (default: true)

### initShowClass
초기 로딩 중 깜빡임을 방지하는데 사용합니다. 화면 표시를 위해 특정 클래스를 삭제합니다. 'hide' 클래스 사용을 권장합니다.
```css
.customize_form.hide{display:none;}
```

### focusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다.

### enableFocusOutline
이 옵션은 웹 접근성 포커스 준수를 위해 사용합니다. (default: true)

# Improvement List
## version 1.0.3
 - select 말줄임표 기능 추가 

## version 1.0.2
 - checkbox/radio 웹 접근성 준수를 위해 전체 사이즈 버튼 구조 변경

## version 1.0.1
 - 텍스트 타입 checkbox 탭 관련 status 버그 개선
 
 - select 접근성 개선 (select 마우스로 선택 완료 시 포커스 풀리지 않도록 처리)
 
 - file 접근성 개선 (포커스 기능 추가)
 
 - checkbox/radio 접근성 개선 (포커스 기능 추가)