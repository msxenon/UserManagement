<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Users Controller</h2>
    <div><button type="button" class="btn btn-primary" @click="addUser">Add new User</button><button type="button" class="btn btn-primary" @click="logout">Logout</button></div>
    <div >
      <ul>
        <li   style="display: block" v-for="(item, index) in items" :key="index">
          <div class="col-sm-2"> {{item.name}}  <button  @click="deleteUser(item.id)" style="color: red">Delete</button>
          </div>
          <hr>
          </li>
      </ul>
    </div>

  </div>
</template>
<script>import axios from 'axios'

export default {
  name: 'Users',
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
        thisuser: 0,
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
    },
    addUser: function () {
      this.postData_.login = prompt('Please enter a username', 'Harry')
      this.postData_.password = prompt('Please enter password', '')
      let x = prompt('Is it admin?y/n', 'n')
      this.postData_.isAdmin = (x === 'y')
      if (this.postData_.login === '' || this.postData_.password === '') {
        alert('some data are missing')
      } else {
        axios.post('http://localhost:8080/adduser', this.postData_)
          .then(response => {
            console.log('helllo_', response)
            this.getData()
          })
          .catch(e => {
            console.log(1222, e)
          })
      }
    },
    deleteUser: function (userid) {
      var user = {userId: userid}
      console.log(userid, this.thisuser)
      if (userid === this.thisuser) {
        alert('you can\'t delete yourself')
      } else {
        axios.post('http://localhost:8080/deleteuser', user)
          .then(response => {
            console.log('helllo_', response)
            this.getData()
          })
          .catch(e => {
            console.log(1222, e)
          })
      }
    },
    logout: function () {
      this.$router.push({name: 'Login', query: {redirect: '/'}})
    }
  },
  created:
    function () {
      this.getData()
      try {
        this.thisuser = this.$route.params.userData.id
        this.userData = this.$route.params.userData
        if (this.userData.admin === false) {
          this.$router.push({name: 'Login', query: {redirect: '/'}})
        }
      } catch (e) {
        this.$router.push({name: 'Login', query: {redirect: '/'}})
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
