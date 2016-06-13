/**
 * Created by Administrator on 2016/6/13.
 */

;(function() {

  var $form = $('#form');
  var $fileInput = $('#fileInput');
  var $fileTrigger = $('#fileTrigger');
  var $fileDropArea = $('#fileDropArea');
  var $previewArea = $('#previewArea');

  function handleFileSelect(files) {
    genFileListInfo(files);
    previewImgs(files);
  }

  function genFileListInfo(files) {
    var filesLength = files.length;
    var filesDesc = [];
    var fileSize = 0;

    for (let i = 0; i < filesLength; ++i) {
      let file = files.item(i);
      fileSize += file.size;
      filesDesc.push(`name: ${file.name}, size: ${file.size};`);
    }

    $('#fileNum').html(files.length);
    $('#fileSize').html(fileSize);
    $('#filesDesc').html(filesDesc.join('<br/>'));
  }

  function previewImgs(files) {
    var imgTypeRegx = /^image\//;
    var filesLength = files.length;

    for (let i = 0; i < filesLength; ++i) {
      let file = files.item(i);
      imgTypeRegx.test(file.type) && previewImgByUrlObject(file);
    }
  }

  function initPreviewImg(file) {
    var $img = $('<img/>');
    $img.appendTo($previewArea).addClass('imgItem').data('file', file);
    return $img;
  }

  function previewImgByFileReader(file) {
    var $img = initPreviewImg(file);

    let reader = new FileReader();
    reader.onload = function imgReaderLoad(e) {
      $img.attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function previewImgByUrlObject(file) {
    var $img = initPreviewImg(file);

    $img.attr('src', window.URL.createObjectURL(file));
    $img.on('load', function() {
      window.URL.revokeObjectURL(this.src);
    });
  }

  $form.on('submit', function(e) {
    e.preventDefault();
  });

  $fileTrigger.on('click', function(e) {
    e.preventDefault();
    $fileInput.focus().trigger('click');
  });

  $fileInput.on('change', function(e) {
    var files = this.files;
    handleFileSelect(files);
  });

  $fileDropArea.on('dragenter dragover', function(e) {
    var dt = e.originalEvent.dataTransfer;

    // 只响应文件拖拽
    return dt.types.indexOf('Files') < 0;
  }).on('drop', function(e) {
    var dt = e.originalEvent.dataTransfer;
    handleFileSelect(dt.files);
    return false;
  });

})();
