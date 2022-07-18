"use strict";
(function () {
    function Start() {
        console.log("App Started!");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/survey-page";
            }
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map
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

function beginSurvey(){
    location.href='/survey-page';
}