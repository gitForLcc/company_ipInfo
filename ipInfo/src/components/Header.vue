<template>
	<div id="header">
      <a class="lf" href="#">
        <img id="logo-top" src="../assets/img/hm-logo2.png">
      </a>
      <span>胡门网络</span>
	</div>
</template>

<script>
	
</script>

<style scoped>
#header{
  height:80px;
  line-height: 80px;
  background:rgba(0,0,0,.7);
  color:#fff;
}
#header span{
  font-size:25px;
  margin-left:10px;
}
#header:after{
  display:block;
  content:'';
  clear:both;
}
#logo-top{
  width:60px;
  height:70px;
  margin:5px 0 0 20px;
}
</style>