<template>
  <div id="ip-info">
  	<div class="search">
  		<input type="text" class="el-input__inner"  placeholder="请输入IP地址" v-model="search" @keyup="handleSearch($event)">
  	</div>
  	<div>
  		<el-button type="success" @click="formVisible=true">添加</el-button>

		<el-dialog title="详细信息" :visible.sync="formVisible">
		  <el-form :model="form">
		    <el-form-item label="域名" :label-width="formLabelWidth">
		      <el-input v-model="form.domain" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="IP地址" :label-width="formLabelWidth">
		      <el-input v-model="form.default" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="formVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleAddConfirm()">确 定</el-button>
		  </div>
		</el-dialog>
  	</div>
  	<el-table :data="searchData" style="width: 100%">
  	<el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column label="域名">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.domain }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Ip地址" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ip: {{ scope.row.default }}</p>
          <p>域名: {{ scope.row.domain }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag  v-show="scope.$index!=status" size="medium">{{ scope.row.default }}</el-tag>
            <el-input v-show="scope.$index==status" placeholder="请输入IP" v-model="default1" clearable></el-input>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" v-show="scope.$index==status" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
        <el-button size="mini" v-show="scope.$index==status" @click="handleConfirm(scope.$index, scope.row)">确定</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
	export default {
	    data() {
	      return {
	      	search:'',
	      	default1:'',
	        tableData: [],
	        searchData:[],
	        status:Number,
	        form:{
	        	default:'',
	        	domain:''
	        },
	        formVisible:false,
	        formLabelWidth: '120px'
	      }
	    },
	    mounted(){
			//获取数据
			this.fetchData();
		},
	    methods: {
	    	fetchData(){
	    		var _this=this;
				this.$http.get('/api/dns/list',{
					timeout: 5000,
				}).then(function(res){	
					_this.tableData=res.data;
					_this.searchData=res.data.slice(0);
				}).catch(function(err){
					console.log('fetchData',err);
				})
	    	},
	    	//查询
	    	handleSearch(ev){
	    		ev.preventDefault();
        		if(this.search.length<=0){
        			this.searchData=this.tableData;
        		}else{
        			var arr=[];
        			for(var i=0;i<this.searchData.length;i++){
	        			if(this.searchData[i].domain.indexOf(this.search)!=-1 || this.searchData[i].default.indexOf(this.search)!=-1){
	        				arr.push(this.searchData[i])
	        			}
        			}
        			this.searchData=arr
        		}
	    	},
	    	//添加确认
	    	handleAddConfirm(){
	    		var _this=this;
	    		this.formVisible=false;
	    		var formDefault=this.form.default.trim();
	    		var formDomain=this.form.domain.trim();
	    		this.$http.get('/api/dns/add',{
	    			params:{
	    				default:formDefault,
	    				domain:formDomain,
	    				a:formDefault
	    			}
	    		}).then(function(res){
	    			if(res.data.status=='error'){
	    				_this.$message(res.data.msg[0]);
	    			}else if(res.data.status=='ok'){
	    				_this.$message({
	    					message:'添加成功',
	    					type:'success'
	    				});
	    				_this.searchData.push({default:formDefault,domain:formDomain})
	    			}
	    			
	    		}).catch(function(err){
	    			console.log('handleAddConfirm',err);
	    		})
	    	},
	    	//编辑
	      	handleEdit(index, row) {
	        	this.status=index;
	      },
	      //编辑取消
	      handleCancel(index, row){
	      	this.status=-1;
	      	this.domain='';
	      },
	      //编辑确定
	      handleConfirm(index, row){	
	      	var _this=this;
	      	var default1=this.default1.trim();
	      	var domain=row.domain;
	      	console.log(domain,default1);
	      	this.$http.get('/api/dns/update',{
	      		params:{
	      			default:default1,
	      			domain:domain,
	      			a:default1
	      		}
	      	}).then(function(res){
	      		console.log(res);
	      		if(res.data.status=='error'){
	      			_this.status=-1;
	      			alert(res.data.msg[0]);
	      		}else{
					_this.status=-1;
					row.default=default1;
	      		}
	      		
	      	}).catch(function(err){
	      		console.log('handleConfirm',err);
	      	})
	       },
	      //删除
	      	handleDelete(index, row) {
	      		var _this=this;
	        	this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
	        		 	confirmButtonText: '确定',
			          	cancelButtonText: '取消',
			          	type: 'warning',
			          	center: true
			      }).then(()=>{
			      	var domain=row.domain;
			      	 	
			      	this.$http.get('/api/dns/delete',{
			      		params:{
			      			domain:domain,
			      			a:'1.2.3.4'
			      		}
			      	}).then(function(res){
			      		_this.searchData.splice(index,1); 
			      		_this.$message({
			      		type: 'success',
            			message: '删除成功!'
			      		})
			      	}).catch(function(err){
			      		console.log('handleDelete',err);
			      	})


			      	
			      }).catch(()=>{
			      	this.$message({
			      		type: 'info',
            			message: '已取消删除'
			      	})
			      })
	      }
	    }
	}
</script>
<style scoped>
	#ip-info{
		width:1199px;
		margin:0 auto;
		margin-bottom:100px;
	}
	#ip-info .search{
		margin:20px 0 30px 0;
	}
</style>