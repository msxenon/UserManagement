<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Login</h2>
    <div >
      <input
        type="text"
        v-model="postData_.login"
        placeholder="Username"
      >
      <div>
        <input
        type="password"
        v-model="postData_.password"
        placeholder="Password"
      >
      </div>
      <button
        @click="postData()"
      >
        Login
      </button>
    </div>

  </div>
</template>

<script>import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      thisuser: -1,
      postData_: {
        login: '',
        password: ''
      },
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  methods: {
    postData: function () {
      if (this.postData_.login === '' || this.postData_.password === '') { alert('Username or Password is empty') } else {
        console.log('data to post', this.postData_.login)
        axios.post('http://localhost:8080/login', this.postData_, this.axiosConfig)
          .then(response => {
            if (response.data.success === false) {
              alert('incorrect login data')
            } else {
              console.log('helllo', response.data.id)
              this.$router.push({ name: 'Users', query: { redirect: '/users' }, params: {thisuser: response.data.id} })
            }
          })
          .catch(e => {
            console.log(1222, e)
            // this.errors.push(e)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
