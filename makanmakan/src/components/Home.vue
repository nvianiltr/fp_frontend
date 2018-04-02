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
		<h1>makanmakan</h1>
		<form class="form-inline">
			<div class="form-group mx-sm-3 mb-2">
    			<input type="text" name="search-food" class="form-control form-control-lg" id="inputOption" placeholder="What to cook today?">
			</div>
			<button type="submit" class="btn btn-warning btn-lg mb-2 hvr-sweep-to-right">Search</button>
		</form>
		<p><ins>Advanced Search</ins></p>
	</div>
</div>


<div class="container" id="view-option">
  <div class="row">
    <h3 class="hvr-underline-from-center" id="article-option">Articles</h3>
    <h3 class="hvr-underline-from-center" id="trending-option">Trending Recipes</h3>
    <h3 class="hvr-underline-from-center" id="newest-option">Newest Recipes</h3>    
  </div>
</div>

<div class="container" id="article-container">
  <div class="row">
    <div class="col-3 article-food">
      <div class="article-food-write"></div>
      <h3>Cara masak Ramen Ayam</h3>
    </div>
    <div class="col-3 article-food">
      <div class="article-food-write"></div>
      <h3>Cara masak Ramen Ayam</h3>
    </div>
    <div class="col-3 article-food">
      <div class="article-food-write"></div>
      <h3>Cara masak Ramen Ayam</h3>
    </div>
    <div class="col-3 article-food">
      <div class="article-food-write"></div>
      <h3>Cara masak Ramen Ayam</h3>
    </div>
  </div>
</div>

<div class="container" id="trending-container">
  <div class="row">
    <div class="col-3 trending-food">
      <div class="trending-food-write"></div>
      <h3>Ramen Ayam</h3>
    </div>
    <div class="col-3 trending-food">
      <div class="trending-food-write"></div>
      <h3>Ramen Ayam</h3>
    </div>
    <div class="col-3 trending-food">
      <div class="trending-food-write"></div>
      <h3>Ramen Ayam</h3>
    </div>
    <div class="col-3 trending-food">
      <div class="trending-food-write"></div>
      <h3>Ramen Ayam</h3>
    </div>
  </div>
</div>

<div class="container" id="newest-container">
  <div class="row">
    <div class="col-3 newest-food">
      <div class="newest-food-write"></div>
      <h3>Indomie Ayam</h3>
    </div>
    <div class="col-3 newest-food">
      <div class="newest-food-write"></div>
      <h3>Indomie Ayam</h3>
    </div>
    <div class="col-3 newest-food">
      <div class="newest-food-write"></div>
      <h3>Indomie Ayam</h3>
    </div>
    <div class="col-3 newest-food">
      <div class="newest-food-write"></div>
      <h3>Indomie Ayam</h3>
    </div>
  </div>
</div>
</div>
</template>

<script>
    export default {
    name: 'Home'
  }
</script>

<style>
*{
  font-family: 'Montserrat', sans-serif
}

.navbar {
   background-color: transparent;
   background: transparent;
   border-color: transparent;
}

#navbarArea{
  margin-right: 20vw;
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
  height: 75vh;
  background-position: center;
  padding-top: 20vh;
}

.jumbotron .container-fluid{
  text-align: center;
}

.jumbotron h1{
  font-family: 'Righteous', cursive;
  color: white;
  font-size: 100px;
}

form{
  margin-left: 20vw;
}

form .form-group .form-control{
  width: 40vw;
}

form button{
  border:none !important;
  background-color: #FF6200 !important;
  width: 10vw;
  font-weight: 700 !important;
  color: white !important;
  box-shadow: 2px 2px 1px #020202 !important;
}

form button:hover{
  color: #FF6200 !important;
}

.container-fluid p{
  font-size: 20px;
  color: white;
  cursor: pointer;
}


#view-option{
  text-align: center;
  margin: 0 auto;
  margin-bottom: 5vh; 
}

#view-option h3{
  color: black;
  cursor: pointer;
  margin-left: 2.5vw;
}

#view-option h3:hover, #view-option h3:focus, #view-option h3:active{
  color:#FF6200;
}

#view-option h3:first-child{
  margin-left:22.5vw;
}

#view-option h3:before{
  background: #FF6200 !important;
}

/*Part 2*/
#trending-container div div{
  margin:0;
  padding: 0;
}

.trending-food .trending-food-write{
  margin: 0 10px !important;
  padding: 0;

  background-image:url();
  background-size: 60vh;
  background-position: center;
  background-repeat: no-repeat;

  min-height: 25vh;

  transition: background-size 0.25s;
}

.trending-food:hover .trending-food-write,
.trending-food:focus .trending-food-write {
  background-size: 75vh;
}

.trending-food h3{
  margin-top: 2vh;
  text-align: center;
  color: black;
  font-weight: 700;
}


/*Part 3*/
#newest-container, #trending-container, #article-container{
  margin-top: 5vh;
  margin-bottom: 10vh;
}

#newest-container div div{
  margin:0;
  padding: 0;
}


.newest-food .newest-food-write{
  margin: 0 10px !important;
  padding: 0;

  background-image:url();
  background-size: 60vh;
  background-position: center;
  background-repeat: no-repeat;

  min-height: 25vh;

  transition: background-size 0.25s;
}

.newest-food:hover .newest-food-write,
.newest-food:focus .newest-food-write {
  background-size: 75vh;
}

.newest-food h3{
  margin-top: 2vh;
  text-align: center;
  color: black;
  font-weight: 700;
}

/*Part 4*/
#article-container div div{
  margin:0;
  padding: 0;
}

.article-food .article-food-write{
  margin: 0 10px !important;
  padding: 0;

  background-image:url();
  background-size: 60vh;
  background-position: center;
  background-repeat: no-repeat;

  min-height: 25vh;

  transition: background-size 0.25s;
}

.article-food:hover .article-food-write,
.article-food:focus .article-food-write {
  background-size: 75vh;
}

.article-food h3{
  margin-top: 2vh;
  text-align: center;
  color: black;
  font-weight: 700;
  padding: 0 10px;
}
  </style>