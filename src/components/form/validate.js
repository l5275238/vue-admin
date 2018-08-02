
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

export  let validate= {
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

    isTel:function (str) {
      return _validateByReg(str,/^[1][3,4,5,7,8,6,9][0-9]{9}$/)
    },

    isEmai:function (str) {
      return _validateByReg(str,/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    },
  isNumber:function(str){
    return  _validateByReg(str,/^\d+([\.]\d+)*$/)
  },
    minLengh:function(str,lenght){
      return str.length>lenght;
    },

  }
 export let messges={
    isNotEmpty:'请输入{messge}',
    isTel:"请输入正确的手机号码",
    isEmai:"请输入正确的邮箱",
    ajax:"{messge}已存在",
    minLengh:"{messge}最小长度为{key}",
   isNumber:"请输入数字"

  }
