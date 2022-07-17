"use strict";
(function () {
    function Start() {
        console.log("App Started!");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/movie-list";
            }
        });
    }
    window.addEventListener("load", Start);
})();

function myFunction() {
   
    if (document.getElementById('MC').checked) {
        location.href='/createMC';
    }
    else if (document.getElementById('TF').checked) {
        location.href='/createTF';
    }
    else if (document.getElementById('SA').checked) {
        location.href='/createSA';
    }
    
}
