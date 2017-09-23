<template>
  <div id="app" class="container">
      <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <h1>Http</h1>

              <div class="form-group">
                   <label>Email</label>
                  <input type="text" class="form-control" placeholder="Email" v-model="user.email">
              </div>

              <div class="form-group">
                   <label>Password</label>
                <input type="password" class="form-control" placeholder="Enter Password" v-model="user.password">
              </div>
              <button class="btn btn-block btn-primary" @click="submit()">Access</button>
              <hr>
              <button class="btn btn-block btn-info" @click="fetchData">Get Data</button>
              <ul class="list-group">
                  <li class="list-group-item" v-for="u in users">{{u.email}} - {{u.password}}</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>

export default {
	data() {
		return {
			user: {
				email: '',
                password: ''
            },
            users: []
        }
    },
    methods: {
		submit() {
            this.$http.post('http://localhost:4000/users', this.user)
                .then(response => {
                	console.log(response)
                }, error => {
                	console.log(error)
                })
        },
        fetchData() {
            this.$http.get('http://localhost:4000/users')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                	const newArray = []
                    for(let key in data) {
                		newArray.push(data[key])
                    }
                })
                .catch(e => {
                	return e
                })
        }
    }
}
</script>

<style>

</style>
