import Login from './components/Login.vue'
// import Register from './components/Register.vue'
import IpInfo from './components/IpInfo.vue'




export default[
	{
		path:'/login',
		component:Login
	},
	// {
	// 	path:'/register',
	// 	component:Register
	// },
	{
		path:'/ip-info',
		component:IpInfo
	},
	{
		path:'/',
		redirect:'/login'
	},
	{
		path:'*',
		redirect:'/login'
	}
]