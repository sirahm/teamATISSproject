// IIFE -- Immediately Invoked Function Expression
(function(){

  function Start()
  {
      console.log("App Started...");

      let deleteButtons = document.querySelectorAll('.btn-danger');
      
      for(button of deleteButtons)
      {
          button.addEventListener('click', (event)=>{
              if(!confirm("Are you sure?")) 
              {
                  event.preventDefault();
                  window.location.assign('/survey');
              }
          });
      }
  }

  window.addEventListener("load", Start);

})();

function myFunction() {
   
    if (document.getElementById('MCOption').checked) {
        location.href='/createMC';
    }
    else if (document.getElementById('TFOption').checked) {
        location.href='/createTF';
    }
    else if (document.getElementById('SAOption').checked) {
        location.href='/createSA';
    }
    
}

