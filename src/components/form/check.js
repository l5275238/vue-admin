import {messges,validate} from './validate'
export default function check(rules,name) {

  return function (a, value, callback) {

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
