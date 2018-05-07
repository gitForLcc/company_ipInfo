import getters from './getters'

const state={
	loading:false
}
const mutations={
	showLoading(state){
		state.loading=true
	},
	hideLoading(state){
		state.loading=false
	}
}

export default{
	state,
	mutations,
	getters
}