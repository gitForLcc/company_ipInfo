<template>
	<div id="main">
      <div class="container">
        <div class="container-html">
          <h1>账号登陆</h1>
        <el-form class="demo-ruleForm" ref="form" status-icon :rules="rules" :model="form">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off">
              
            </el-input>
          </el-form-item>
           <el-form-item label="确认密码:" prop="checkPwd">
            <el-input type="password" v-model="form.checkPwd" placeholder="请再次输入密码" auto-complete="off">
              
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRegister('form')">注册</el-button>
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
      	}
      }
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
      var validateCheckPwd = (rule, value, callback) => {
		   if (value === '') {
		    callback(new Error('请再次输入密码'))
		   } else if (value !== this.form.password) {
		    callback(new Error('两次输入密码不一致!'))
		   } else {
		    callback()
		   }
  	}
		    return{
		      form:{
		        username:'',
		        password:'',
		        checkPwd:''
		      },
          rules:{
            username: [
              	{ validator: validateUser, trigger: 'blur' }
            ],
            password: [
              	{ validator: validatePwd, trigger: 'blur' }
            ],
            checkPwd:[
            	{ validator: validateCheckPwd, trigger: 'blur' }
            ]
          }
		    }
      },
		  methods:{
		    onRegister(formName){
		      this.$refs[formName].validate((valid)=>{
            if(valid){
              alert('success')
            }else{
              return false
            }
          })
		    }
		}
	}
</script>

<style scoped>
#main .el-form-item__label{
  color:#fff;
  
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