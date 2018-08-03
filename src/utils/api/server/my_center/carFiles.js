import Server from '@/api/server.js'

class CarFiles extends Server{
  constructor(){
    super()
  }

  //获取默认车型
  getMyCarInfo(){
    return this.axios({
      url:"/Action/McenterQueryMyCarAction.do",
      data:{
        user_id:'user_id'
      },
      success:res=>{
        let defaultcarId = '';
        res.map(obj=>{
          if (obj.taskId == '1429') {
            defaultcarId = obj.rows[0].car_id;
            this.vm.default_carid = defaultcarId;
          }
          if (obj.taskId == '1427') {
            this.vm.carlist = obj.rows.map(function (item) {
              var carname = item.car_name.split('/');
              item.carname_text = carname[0] + '-' + carname[1];
              item.logosrc = qshObject.absoluteImg(item.brand_logo);
              if (item.car_id == defaultcarId) {
                item.sort = 10;
                item.default = true;
              } else {
                item.sort = 2;
                item.default = false;
              }
              return item;
            }).sort(function (a, b) {
              return b.sort - a.sort;
            });
          }
        })
        this.vm.islogin = true;
      }
    })
  }

  //设置默认车型
  setDefaultCar(){
    let car_id = this.vm.carlist[this.vm.chooseIndex].car_id;
    return this.axios({
      url: '/Action/McenterUpdateMyCarAction.do',
      data:{
        type:1,
        user_id:'user_id',
        car_id:car_id
      },
      success:res=>{
        this.vm.carlist.map(function (item) {
          item.default = false;
        })
        this.vm.carlist[this.vm.chooseIndex].default = true;
        this.vm.default_carid = car_id;
      }
    })
  }

  //查询全部保养记录
  getBaoYangList(){
    return this.axios({
      url:'/Action/BaoYangDangAnAction.do',
      data:{
        type:0,
        car_id:this.vm.car_id
      },
      success:res=>{
        this.vm.islogin=true;
        let list = res;
        let length = list.length;
        let copy = [];
        /*后台返回数据处理,tip=1放在数组开头*/
        if(length>0){
          for(let i =length;i>1;){
            i--;
            if(list[i].tip=="1"){
              copy.unshift(list[i]);
              list.splice(i,1);
            }
          }
          list.unshift(...copy);
        }
        this.vm.data = list;
      }
    })
  }

  //获取所有保养项目
  getMateList(){
    let {car_conf_id} = this.vm;
    return this.axios({
      url:'/Action/MainCate.do',
      data:{
        car_conf_id:car_conf_id
      },
      success:res=>{
        let data = res.map(item=>{
          return item = {
            ...item,
            ischeck: false
          }
        })
        this.vm.mateList = [...data];
        this.vm.tempInit = true;
        this.vm.tempShow = true;
      }
    })
  }

  //添加保养记录
  addBaoYangInfo(){
    let {record_date, record_km, record_money, record_about, hours} = this.vm.info;
    record_about = record_about.substr(0, record_about.length-1);
    hours = hours.substr(0, hours.length-1);
    if(!record_date.length){
      this.vm.$vux.toast.show({
        type:'cancel',
        text:'请保养选择时间'
      })
      return false
    }
    if(!record_km.length){
      this.vm.$vux.toast.show({
        type:'cancel',
        text:'请填写保养里程数'
      })
      return false
    }
    if(!record_money.length){
      this.vm.$vux.toast.show({
        type:'cancel',
        text:'请填写保养金额'
      })
      return false
    }
    if(Number(record_money)<=10){
      this.vm.$vux.toast.show({
        type:'cancel',
        text:'保养金额不得低于两位数'
      })
      return false;
    }
    if(!record_about.length){
      this.vm.$vux.toast.show({
        type:'cancel',
        text:'请选择保养项目'
      })
      return false
    }
    return this.axios({
      url:'/Action/BaoYangDangAnAction.do',
      data:{
        type:1,
        car_id: this.vm.car_id,
        car_conf_id: this.vm.car_conf_id,
        record_date: record_date,
        record_km: record_km,
        record_money: record_money,
        record_about: record_about,
        hours: hours,
        record_remark: this.vm.info.record_remark
      },
      success:res=>{
        this.vm.info = {
          ...this.vm.defaultInfo
        }
        this.vm.mateList.map(item=>{
          item.ischeck = false
        })
        this.vm.$emit('hideList');
        this.vm.$emit('upDate');
      }
    })
  }

  //查询单条保养记录
  getRecordList(){
    let {record_id, order_id} = this.vm;
    return this.axios({
      url: '/Action/BaoYangDangAnAction.do',
      data:{
        type:4,
        record_id: record_id,
        order_id: order_id
      },
      success:res=>{
        if(!res[0].record_detail){
          this.vm.type = 1;
          this.vm.data = {...res[0]};
        }else{
          this.vm.type = 2;
           this.vm.data = {
           ...res[0],
            record_date:res[0].record_date.substr(0,7).replace('-','年') + '月',
            record_detail: JSON.parse(data[0].record_detail)
          }
          this.vm.data[0].record_detail.map((item)=>{
            item.material.map((index)=>{
              index.goods_main_img = qshObject.absoluteImg(index.goods_main_img)
            })
          })
        }
      }
    })
  }

  //获取已经选中的保养项目
  getCheckedMate(){
    let {car_conf_id} = this.vm;
    return this.axios({
      url:'/Action/MainCate.do',
      data:{
        car_conf_id:car_conf_id
      },
      success:res=>{
        let hourArray = this.vm.data.hour_ids.split(',');
        this.vm.mateList = res.map(item => {
          let hourArr = item.hour_id.split(',');
          if(this.vm.equals(hourArray,hourArr)){
            return item = {
              ischeck:true,
              ...item
            }
          }else {
            return item = {
              ischeck:false,
              ...item
            }
          }
        })
      }
    })
  }

  //删除保养记录
  deleteList(){
    let {record_id} = this.vm;
    return this.axios({
      url: '/Action/BaoYangDangAnAction.do',
      data:{
        type: 3,
        record_id: record_id
      },
      success:res=>{
        this.vm.$router.go(-1)
      }
    })
  }

  //修改自己添加的保养记录
  saveList(){
    let {record_id, car_id, record_about, hourArray} = this.vm;
    let {record_date, record_km, record_money} = this.vm.data;

    return this.axios({
      url:'/Action/BaoYangDangAnAction.do',
      data:{
        type: 2,
        record_id: record_id,
        car_id: car_id,
        record_date: record_date,
        record_km: record_km,
        record_money: record_money,
        record_about: record_about,
        hours: hourArray
      },
      success:res=>{
        this.vm.$router.go(-1);
      },
      error:err=>{
        this.erroFn();
        this.vm.record_about = '';
        this.vm.hourArray = ''
      }
    })
  }

  //修改平台生成的保养记录备注
  updateList(){
    let {record_id, record_remark} = this.vm.data;

    return this.axios({
      url: '/Action/BaoYangDangAnAction.do',
      data:{
        type: 5,
        record_id: record_id,
        record_remark: record_remark
      },
      success:res=>{
        this.vm.$router.go(-1);
      }
    })
  }
}

const carFiles = new CarFiles();

export default carFiles;
