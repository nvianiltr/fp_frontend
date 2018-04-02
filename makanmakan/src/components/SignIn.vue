/* eslint-disable */
<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-company-blue">
            <a class="navbar-brand" href="#">makanmakan</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse float-right" id="navbarArea">
                <ul class="navbar-nav ml-auto" id="navbarOption">

                    <li class="nav-item active">
                        <a class="nav-link hvr-underline-from-center" href="#">Recipes & Menus</a>
                    </li>

                    <li class="nav-item active">
                        <a class="nav-link hvr-underline-from-center" href="#">Expert's Advices</a>
                    </li>

                    <li class="nav-item disabled">
                        <a class="nav-link" href="#">|</a>
                    </li>

                    <li class="nav-item active">
                        <a class="nav-link hvr-underline-from-center" href="#">Sign In</a>
                    </li>

                    <li class="nav-item disabled">
                        <a class="nav-link" href="#">or</a>
                    </li>

                    <li class="nav-item active">
                        <a class="nav-link hvr-underline-from-center" href="#">Sign Up</a>
                    </li>

                </ul>
            </div>
        </nav>

        <div class="jumbotron">
            <div class="container-fluid">
                <h1>sign in</h1>
                <div class="col-6 offset-xl-3">
                    <form>
                        <div class="form-group">
                            <label for="signin-email-username">E-mail / Username</label>
                            <input type="text" class="form-control form-control-lg" id="signin-email-username" aria-describedby="emailHelp" placeholder="Email / Username" required>
                        </div>
                        <div class="form-group">
                            <label for="signin-password">Password</label>
                            <input type="password" class="form-control form-control-lg" id="signin-password" placeholder="Password" required>
                        </div>
                        <button type="submit" class="btn btn-lg btn-warning hvr-sweep-to-right">Submit</button>
                    </form>
                </div>
                <p>Don't have an account?  <span>Sign up now!</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'SignIn'
  }
  // new Vue({
  //       el: '#app', // semua function di dalam sini, bisa ubah semua yang di dalem #root
  //       data: {
            
  //       },
  //       methods: {
  //           pullData() {
  //               // const url = 'http://localhost:8000/api/user';
  //               // const data = {};
  //               // console.log(data);
  //               // console.log(url);
  //               // this.$http.post(url, data).then(response => {
  //               //     console.log(response.body);
  //               // }, response => {
  //               //     console.log(response.body);
  //               // });
  //           }
  //       },
  //       computed: { // will only be called when, for example, this.message is changed
            
  //       }
  //   })

</script>

<style>


*{
    font-family: 'Montserrat', sans-serif;
}

.navbar {
   background-color: transparent;
   background: transparent;
   border-color: transparent;
}

.navbar-brand{
    font-family: 'Righteous', cursive;
    color: white;
}

.nav-link{
    font-size:20px;
    margin: 0 10px;
    font-weight: 500;
}

/*Part 1*/
.jumbotron{
    background-image:linear-gradient(rgba(255,98,0,.5), rgba(255,98,0,.5)),url();
    background-size: cover;
    min-height: 100vh;
    background-position: center;
    padding-top: 20vh;
    margin-bottom: 0;
}

#sign-up{
    padding-top: 10vh;
}

.jumbotron .container-fluid{
    text-align: center;
}

.jumbotron h1{
    font-family: 'Righteous', cursive;
    color: white;
    font-size: 100px;
}

.form-group, .form-row{
    text-align: left;
}

.form-row{
    margin-bottom: 1vh;
}

.form-group label,.form-row .col label{
    text-align:left;
    color: white;
}

.form-group input{
    width: 45vw;
}

form button{
    background-color: #ff6200 !important;
    color: white !important;
    border: none !important;
}

form button:hover{
    color:#ff6200 !important;
}

p{
    margin-top: 2.5vh;
    color: white;
}

p span{
    font-weight: 700;
}
</style>