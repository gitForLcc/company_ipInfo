 <template>
	<div id="main">
      <div class="container">
        <div class="container-html">
          <h1>账号登陆</h1>
        <el-form class="demo-ruleForm" ref="form" status-icon :rules="rules" :model="form">
          <el-form-item>
            <label for="username">用户名：</label>
            <el-input  v-model="form.name" placeholder="请输入用户名" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <label for="passwd">密码：</label>
            <input class="el-input__inner" @keyup.enter="onSubmit('form')" auto-complete="off" v-model="form.passwd" type="password" placeholder="请输入密码">
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit('form')">登录</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
</template>
<script>
	export default{
		 data(){
      var validateUser = (rule, value, callback) => {
         var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
         if (value === '') {

          callback(new Error('请输入用户名'))
         } else if (!pattern.test(value)) {
          callback(new Error('请输入3-10个字母/汉字/数字/下划线'))
         } else {
          callback()
      }}
      var validatePwd = (rule, value, callback) => {
         var pattern = /^\S{3,20}$/g
         if (value === '') {
          callback(new Error('请输入密码'))
         } else if (!pattern.test(value)) {
          callback(new Error('请输入3-20个非空白字符'))
         } else {
          callback()
         }
      }
		    return{
		      form:{
		        name:'',
		        passwd:''
		      },
          rules:{
            name: [
              { validator: validateUser, trigger: 'blur' }
            ],
            passwd: [
              { validator: validatePwd, trigger: 'blur' }
            ]
          }
		    }
      },
		  methods:{
		    onSubmit(formName){
          var _this=this;
		      this.$refs[formName].validate((valid)=>{
            if(valid){
              var name=this.form.name;
              var passwd=this.form.passwd;
              this.$http.post('/login',{
                name:name,
                passwd:passwd
              }).then(function(res){
                if(res.data.status=='ok'){
                  sessionStorage.setItem('token',res.data.token)//保存token
                  _this.$router.push({path:'/ip-info'})
                }else if(res.data.status=='error'){
                  alert(res.data.msg)
                }
                
                
              }).catch(function(err){
                console.log(err);
              })
              

            }else{
              return false
            }
          })
		    }
		}
	}
</script>
 
<style scoped>
#main label{
  float:left;
  
}
#main .container{
  width:500px;
  height:400px;
  color:#fff;
  background-image:url('../assets/img/bg-login.jpg');
  background-repeat: no-repeat;
  margin:0 auto;
  text-align: center;
  margin-top:30px;
  
}
#main .container-html{
  width:500px;
  height:400px;
  background:rgba(40,57,101,.8);
  padding:10px 20px;

}
</style>