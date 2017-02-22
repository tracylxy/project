/* textarea高度随内容自适应 */
(function($){
  $.fn.autoTextarea = function(options) {
    var defaults={
      maxHeight:null,
      minHeight:$(this).height()
    };
    var opts = $.extend({},defaults,options);
    return $(this).each(function() {
      $(this).bind("paste cut keydown keyup focus blur",function(){
        var height,style=this.style;
        this.style.height = opts.minHeight + 'px';
        if (this.scrollHeight > opts.minHeight) {
          if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
            height = opts.maxHeight;
            style.overflowY = 'scroll';
          } else {
            height = this.scrollHeight;
            style.overflowY = 'hidden';
          }
          style.height = height + 'px';
        }
      });
    });
  };
})(jQuery);


function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

// 验证重复元素，有重复返回true；否则返回false
function checkSameValue(arr)
{
    var nary=arr.sort(); 
    for(var i=0;i<nary.length-1;i++){
      if (nary[i]==nary[i+1]) {
          return true;
      } 
    }
}         

$(function(){

  $(".reg textarea").autoTextarea({
    maxHeight:72,
    minHeight:34
  });

  //注册
  // $(".reg .reg-step li").click(function(){
  //   var thisLi = $(this);
  //   if (thisLi.find(".up").hasClass("dis")){
  //     thisLi.find(".up").removeClass("dis");
  //     thisLi.find(".down").addClass("dis");
  //     thisLi.parent().find("li").addClass("dis").find("b").addClass("dis");
  //     thisLi.removeClass("dis");
  //   }else{
  //     console.log(22);
  //     thisLi.find(".up").addClass("dis");
  //     thisLi.find(".down").removeClass("dis");
  //     thisLi.parent().find("li").removeClass("dis").addClass("dis");
      
  //   }
  // })





  jQuery.validator.addMethod("checkBlank", function(value, element, param) {
      var reg=/\s/;
      return !reg.test(value);
  }, "不能输入空格!");

  jQuery.validator.addMethod("checkBlankInMiddle", function(value, element, param) {
      var reg=/^[^ ]+[\s\S]*[^ ]+$/;
      var reg1 = /\s/;
      if (!reg1.test(value)){//先检查是否有空格，没有的话，直接返回true,不验证
        return true;
      }else{//有空格的话，再验证是否在中间
        return reg.test(value);
      } 
  }, "空格只允许出现在中间!");

  var min = $("#tagsNum").attr('minNum');
  var max = $("#tagsNum").attr('maxNum');
  var message = "输入范围"+ min +"-"+ max +"个标签";

  var message1 = "您最多只能添加"+ max +"个标签";
   jQuery.validator.addMethod("checkTagsNum", function(value, element) {
      if ($("#tagsbox").val()==""){
         var tagNum = 0;
      }else{
         var tagNum = $("#tagsbox").val().split(",").length;
      }
     
      var nTagNum = $("#imgtag").val().split(/\s+/).length
      tagNum += nTagNum;
      var max = $("#tagsNum").attr('maxNum');
      var msg = true;
      if (tagNum>max){
        msg = false;
      }
      return msg;
  }, message1);

  // jQuery.validator.addMethod("checkTagsNum", function(value, element) {
  //     var tagNum = $("#tagsbox").val().split(",").length;
  //     console.log("当前标签数："+tagNum);
  //     var minNum = $("#tagsNum").attr("minNum");
  //     var maxNum = $("#tagsNum").attr("maxNum");
  //     var msg = true;
  //     if (tagNum<minNum || tagNum>=maxNum){
  //       msg = false;
  //     }
  //     return msg;
  // }, "您最多只能添加"+$("#tagsNum").attr("minNum")+"-"+$("#tagsNum").attr("maxNum")+"个标签");

  jQuery.validator.addMethod("checkSameValue", function(value, element, param) {
      var msg = true;
      var tagList = $("#imgtag").val().trim().split(/\s+/).join(",");
      var oldTags = $("#tagsbox").val();   

      var newTags;
     if (oldTags==''){
        newTags = tagList;
     }else{
        newTags = oldTags + "," + tagList
     }

    if (checkSameValue(newTags.split(","))){
        msg = false;
    }
    return msg;

  }, "不能输入相同的标签!");

  // 匹配中文、英文 
  jQuery.validator.addMethod("isChineseChar", function(value, element) {       
       return this.optional(element) || /^[\u4e00-\u9fa5 a-zA-Z]+$/.test(value);       
  }, "匹配中文(包括汉字和字母)"); 

    // 判断是否为合法电话号码-固定电话&手机号 
  jQuery.validator.addMethod("isPhone", function(value, element) {       
       return this.optional(element) || /^(0[0-9]{2,3}\-)?([1-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value) || /^[1][0-9]{10}$/.test(value);       
  }, "请输入正确格式的联系电话");

    // 判断是否为合法电话号码-固定电话 
  jQuery.validator.addMethod("isFax", function(value, element) {       
       return this.optional(element) || /^(0[0-9]{2,3}\-)?([1-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value);       
  }, "请输入正确格式的传真电话");

    // 判断是否为合法手机号码 
  jQuery.validator.addMethod("isMobile", function(value, element) {       
       return this.optional(element) || /^[1][3578][0-9]{9}$/.test(value);       
  }, "请输入正确格式的手机号");

      // 判断是否为邮箱 
  jQuery.validator.addMethod("isEmail", function(value, element) {       
       return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);       
  }, "请输入正确的邮箱");

    // 判断是否为合法QQ号 
  jQuery.validator.addMethod("isQQ", function(value, element) {       
       return this.optional(element) || /^[1-9]+[0-9]{3,}/.test(value);       
  }, "请输入正确的QQ号");

  
   // 判断是否为合法邮编 
  jQuery.validator.addMethod("isPost", function(value, element) {       
       return this.optional(element) || /^\d{6}$/.test(value);       
  }, "请输入正确的邮编号码");

     // 判断是否为身份证号
  jQuery.validator.addMethod("isIdNum", function(value, element) {       
       return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);       
  }, "请输入正确格式的身份证号码");

})