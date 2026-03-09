
        const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        const container = document.getElementById("issuesContainer");
        const loader = document.getElementById("loader");
        const issueCountDisplay = document.getElementById("issueCountDisplay");

        // Log in section

        function login()
         {
            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

              if 
            
            (user === "admin" && pass === "admin123") 
            {
                document.getElementById("loginPage").classList.add("hidden");
                document.getElementById("mainPage").classList.remove("hidden");
                loadIssues("all");
            } 
                else 
            {
                alert("Wrong credentials! Try admin / admin123");
            }
        }
