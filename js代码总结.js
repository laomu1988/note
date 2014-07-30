/**各种js代码总结*/
    
/**点击元素后，元素变成输入框，输入修改元素内容后自动保存：需添加类.inputarea(输入区域).inputtext(输入行)*/
$(document).ready(function(){
    $(".inputarea").on("click",function(){
      var that = $(this);
      if(that.find("textarea").length > 0){
        return;
      }
      var text = that.text();
      var placeholder = that.attr("placeholder");
      if(text === placeholder){
        text = "";
      }
      var input = $('<textarea style="width:'+that.width()+'px;resize: none;" placeholder="'+that.attr("placeholder")+'">'+text+'</textarea>');
      that.html(input);
      input.on("blur",function(){
        var text = $(this).val();
        if(text === ""){
          text = placeholder;
        }
        that.html(text);
      });
      input.focus();
    });
    $(".inputtext").on("click",function(){
      var that = $(this);
      if(that.find("input").length > 0){
        return;
      }
      var text = that.text();
      var placeholder = that.attr("placeholder");
      if(text === placeholder){
        text = "";
      }
      var input = $('<input style="width:'+that.width()+'px;resize: none;" placeholder="'+that.attr("placeholder")+'"" value="'+text+'">');
      that.html(input);
      input.on("blur",function(){
        var text = $(this).val();
        if(text === ""){
          text = placeholder;
        }
        that.html(text);
        if(that.hasClass("infoName")){
          $(".infoName").html(text);
        }
      });
      input.focus();
    });
});


/**ajax: XMLHttpRequest*/
function createXHR(){
  if(typeof XMLHttpRequest !== "undefined"){
    return new XMLHttpRequest();
  }else if(typeof ActiveXObject !== "undefined"){
    if(typeof arguments.callee.activeXString !== "string"){
      var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
      for(i = 0,len=versions.length;i<len;i++){
        try{
          new ActiveXObject(version[i]);
          arguments.callee.activeXString = versions[i];
          break;
        }catch(e){

        }
      }

    }
  }else{
    throw new Error("Now XHR object available.");
  }
}



