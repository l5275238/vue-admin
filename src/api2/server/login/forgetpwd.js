import Server from "@/api/server.js"
import publicKey from '@/common/publicKey.js'

class Forget extends Server{

constructor(){
  super()
}

getCode(isGet){
  this.vm.codeData.check=isGet?1:0
  this.axios({
    url:"/Action/ForgetPwdServlet.do",
    data:this.vm.codeData,

    success:data=>{
      this.vm.codeData.type = 0;
      var user=data[0].rows[0]
      if(!user){
        this.erroFn({
          msg:"帐号未绑定手机或未注册"
        })
        return
      }
      var mobile = user.valid_mobile;
      var mail =user.valid_email;
      if(mobile != ''){
        this.vm.codeData.number = mobile;
      }else if(mail != ''&&mobile==''){
        this.vm.codeData.type = 1;
      }else if(mail == ''&&mobile==''){
        this.vm.showMsg('帐号未绑定手机和邮箱','cancel');
        return false;
      }

    if(isGet){
        return
    }
      this.getCode(true)
    },
    error:data=>{
      this.vm.showMsg(data.msg)
    }
  })
}


  submit(){

  let data=Object.assign({},this.vm.codeData)
    data.check=4
  if(data.pwd1){
    data.pwd1=publicKey(data.pwd1);

  }
delete data.type
  this.axios({
    url:"/Action/ForgetPwdServlet.do",
    data:data,
    success:data=>{
      this.vm.showMsg('修改成功');
      this.vm.$store.dispatch("setCookie_uuid",data.cookie_uuid)
      this.vm.$store.commit("setToken",data.token);
      this.vm.$router.push('/')
    },
    error:data=>{
      if(data.error == 707){
        this.vm.showMsg('请重新获取验证码','cancel');
      }else{
        this.vm.showMsg(data.msg,'cancel');
      }
    }
  })
}


}
let forgetServer=new Forget()

export default forgetServer;
