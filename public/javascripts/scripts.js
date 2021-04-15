/* global axios */
if (document.querySelector('#new-gun')) {
  document.querySelector('#new-gun').addEventListener('submit', (event) => {
    event.preventDefault()
    // Use FormData to grab everything now that we have files mixed in with text
    const form = document.getElementById("new-gun")
    const gun = new FormData(form);

    // Assign the multipart/form-data headers to axios does a proper post
    axios.post('/gun', gun, {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    })
    .then(function (response) {
      window.location.replace(`/gun/${response.data.gun._id}`)
    })
    .catch(function (error) {
      console.log(error)
      const alert = document.getElementById('alert')
      alert.classList.add('alert-warning')
      alert.textContent = 'Oops, something went wrong saving your gun. Please check your information and try again.'
      alert.style.display = 'block'
      setTimeout(() => {
        alert.style.display = 'none'
        alert.classList.remove('alert-warning')
      }, 3000)
    })
  })
}