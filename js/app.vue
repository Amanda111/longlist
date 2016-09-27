<template>
	<div>
		<ul v-for="li in list" track-by="$index">
			<li>${ $index }</li>
		</ul>
	</div>
</template>
<style>
	li{
		list-style: none;
	}
</style>
<script>
	var request = require('superagent');
	export default {
		data (){
			return {
				list:['1','2','3','4','5','6','7','8']
			}
		},
		methods:{

		}
	}
</script>