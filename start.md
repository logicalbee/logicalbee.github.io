---
layout: landing
sitemap:
  exclude: 'yes'
---

<center>

<div class="masthead-title">
<h1 style="text-align: center;">WORK FROM HOME</h1>
<h2 style="text-align: center;">How To Start Earning <span style="color: #d00e89;">$500 to $10,000+ Per Month</span> Start Today</h2>
<p style="text-align: center;"><span style="text-decoration: underline;">No experience required</span></p>
</div>
<div class="form-container">
<form name="submit-to-google-sheet" >
      <input name="email" type="email" placeholder="Email" required>
      <button type="submit" style="color: rgb(255, 255, 255); background-color: rgb(9, 158, 51); font-size: 24px;">YES! I WANT INSTANT ACCESS</button>
 </form>
 

 <p class="loading js-loading is-hidden">
 	<br>
    <span style="color: #d00e89;"> Thank You...! You Will Get Free ebook in 10 minutes :) </span><a href="/next">Click Next</a>
    <br>
 </p>
 <p class="js-error-message is-hidden">Error!</p>

</div>
</center>

<script>
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzey7iX21VvzUz3Kv2ZaHABPnGKp5zaNz9aqqmxK4D9BcvyE6Y0/exec'
    const form = document.forms['submit-to-google-sheet']
    const loading = document.querySelector('.js-loading')
    const successMessage = document.querySelector('.js-success-message')
    const errorMessage = document.querySelector('.js-error-message')

    form.addEventListener('submit', e => {
      e.preventDefault()
      showLoadingIndicator()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error))
    })

    function showLoadingIndicator () {
      form.classList.add('is-hidden')
      loading.classList.remove('is-hidden')
    }

    function showSuccessMessage (response) {
      console.log('Success!', response)
      setTimeout(() => {
        successMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
      }, 500)
    }

    function showErrorMessage (error) {
      console.error('Error!', error.message)
      setTimeout(() => {
        errorMessage.classList.remove('is-hidden')
        loading.classList.add('is-hidden')
      }, 500)
    }

    window.oncontextmenu = function () {
   return false;
}
  </script>