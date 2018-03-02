<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Users Data</h2>
    <div >
    <p>Welcome {{userData.name}} !</p>
    </div>
    <div><button type="button" class="btn btn-primary" @click="logout">Logout</button></div>
  </div>
</template>
<script>import axios from 'axios'

export default {
  name: 'Profile',
  data () {
    return {
      msg: '',
      items: [],
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
    logout: function () {
      this.$router.push({name: 'Login', query: {redirect: '/'}})
    },
    getData: function () {
      axios.post('http://localhost:8080/getusers')
        .then(response => {
          this.items = response.data
        })
        .catch(e => {
          console.log(1222, e)
        })
    },
    data () {
      return {
        userData: {},
        postData_: {
          login: '',
          password: '',
          isAdmin: false
        },
        user: {
          userId: 0
        },
        axiosConfig: {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        }
      }
    }
  },
  created:
    function () {
      this.getData()
      this.userData = this.$route.params.userData
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
