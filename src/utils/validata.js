
var   gettype=Object.prototype.toString
  var  isEmpty =function (str){
    console.log(gettype.call(str) != '[object String]');
    if(gettype.call(str)!='[object String]') return true;
    return str.length <= 0;
  }
  //正则判定
  var _validateByReg = function (str,sRegexp){
    str = str?str.trim():'';
    if(isEmpty(str)) return true;
    if(str && (new RegExp (sRegexp) ) && (new RegExp (sRegexp)).test(str)) return true ;
    return false;
  };

  let validate= {
    /**
     * 是否不为空
     * @param {String} str
     * @return {Boolean}
     */
    isNotEmpty :function (str){
      if(gettype.call(str)!='[object String]') return false;
      return str.length > 0;
    },
    /**
     * 是否为空
     * @param {String} str
     * @return {Boolean}
     */
    isEmpty:isEmpty,
    /**
     * 是否为手机号码
     * @param {String} str
     * @return {Boolean}
     */
    isTel:function (str) {
      return _validateByReg(str,/^[1][3,4,5,7,8,6,9][0-9]{9}$/)
    },
    /**
     * 邮箱校验
     * @param {String} str
     * @return {Boolean}
     */
    isEmai:function (str) {
      return _validateByReg(str,/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    },
    minLengh:function(str,lenght){
      return str.length>lenght;
    },

    // ajax:function (api,key,str,dataFn) {
    //   var item=false
    //   $.ajax({
    //     type: 'post',
    //     url:api,
    //     data:{
    //       [key]:str
    //     },
    //     async:false,
    //     success:function (data) {
    //       console.log(typeof dataFn);
    //       if (typeof dataFn =="function"){
    //         item= dataFn(data)
    //       }
    //
    //     },
    //   })
    //   return item;
    //
    // }

  }
  let messges={
    isNotEmpty:'请输入{messge}',
    isTel:"请输入正确的手机号码",
    isEmai:"请输入正确的邮箱",
    ajax:"{messge}已存在",
    minLengh:"{messge}最小长度为{key}"

  }
 export default function check(rules,name) {

    return function (a, value, callback) {
      debugger
      for(let rule of  rules){
        if(rule[0]=="*"){
          let arr=value.replace('*','')
          let key= arr.split('?')
          let fn=rules[key[0]](value,key[1],this.error);
          let messgeKey=key[1]
          if(!fn){
            callback(new Error(messges[rule].replace(/\w*(\{messge\})\w*/,name).replace(/(\{key\})/,messgeKey)))
          }
        }
        if(!validate[rule](value)){

          callback(new Error(messges[rule].replace(/\w*(\{messge\})\w*/,name)))
          return
        }
      }
      callback();

    }

  }
