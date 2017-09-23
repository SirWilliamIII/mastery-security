<template>

</template>

<script>
    export default {
        name: 'login form',
        data () {
            return {
            	credentials: {
            		email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
        	submit() {
        		var credentials = {
        			email: this.credentials.email,
                    password: this.credentials.password
                }
            }

        }
    }
</script>

<style>
</style>
