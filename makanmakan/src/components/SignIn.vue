<template>

<head>
    <title>| makanmakan</title>

    <!--Bootsrap css-->
    <link rel="stylesheet" href="{{ asset('assets/bootstrap-4.0.0/dist/css/bootstrap.min.css') }}">

  <!--Hovermaster css-->
    <link rel="stylesheet" href="{{ asset('assets/Hover-master/css/hover.css') }}">

    <!--Page css-->
    <link rel="stylesheet" href="{{ asset('assets/sign.css') }}">

    <script src="{{ asset('assets/jquery-3.3.1.min.js') }}"></script>

    <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500i,700" rel="stylesheet">

</head>
<body>

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
                <label for="signin-email">Email / Username *</label>
                <input type="email" class="form-control form-control-lg" id="signin-email" aria-describedby="emailHelp" placeholder="Email / Username" required>
            </div>
            <div class="form-group">
                <label for="signin-password">Password *</label>
                <input type="password" class="form-control form-control-lg" id="signin-password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-lg btn-warning hvr-sweep-to-right">Submit</button>
        </form>
        </div>
        <p>Don't have an account?  <span>sign up now!</span></p>
    </div>
</div>

</template>
<script>
export default {
  name: 'SignIn',
  data () {
    return {
      msg: ''
    }
  }
}
</script>