
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



          // btn toggle function

        async function loadIssues(type) {
            if

             (!container)
              return;


            container.innerHTML = "";
            loader.classList.remove("hidden");
            setActive(type);
            try 

                {
                const res = await fetch(API);
                const data = await res.json();
                let issues = data.data;

                if

                 (type === "open") issues = issues.filter(i => i.status === "open");

                else if 

                (type === "closed") issues = issues.filter(i => i.status === "closed");

                issueCountDisplay.innerText = `${issues.length} Issues`;
                renderIssues(issues);
            }
            
            catch (error) 
            
            {
                console.error("Error fetching data:", error);
            }
             finally 
             
             {
                loader.classList.add("hidden");
            }
        }

        function renderIssues(list)
         {
            container.innerHTML = "";
            if

                 (list.length === 0) 
            
            {
                container.innerHTML = "<p class='col-span-full text-center text-gray-500'>No issues found.</p>";
                return;
            }

            list.forEach(issue => 

             {
                const div = document.createElement("div");
                div.className = `bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border-t-4 
                                ${issue.status === "open" ? "border-green-500" : "border-purple-500"}`;

                div.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <span class="flex items-center gap-1">
                             <i class="fa-solid ${issue.status === 'open' ? 'fa-circle-dot text-green-500' : 'fa-circle-check text-blue-500'} text-[10px]"></i>
                             <span class="text-[10px] font-bold uppercase ${issue.status === 'open' ? 'text-green-500' : 'text-blue-500'}">${issue.status}</span>
                        </span>
                        <span class="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            ${issue.priority}
                        </span>


                    </div>
                    <h3 class="font-bold text-gray-800 mb-1 truncate">${issue.title}</h3>
                    <p class="text-xs text-gray-500 mb-4 line-clamp-2">${issue.description}</p>
                    <div class="flex gap-2 text-[10px] mb-4">
                        <span class="bg-red-50 text-red-600 px-2 py-1 rounded flex items-center gap-1 font-semibold">
                            <i class="fa-solid fa-bug"></i> BUG 
                        </span>

                        <span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded flex items-center gap-1 font-semibold">
                            <i class="fa-solid fa-hand"></i> HELP WANTED
                        </span>


                    </div>
                    <div class="border-t pt-3 mt-auto">
                        <p class="text-[10px] text-gray-500 font-medium">Author: ${issue.author}</p>
                        <p class="text-[10px] text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>`;

                div.onclick = () => openModal(issue);
                container.appendChild(div);
            });
        }

        function setActive(type)

            async function searchIssue() {
            const text = document.getElementById("searchInput").value.trim();
            if (text === "") {
                loadIssues("all");
                return;
            }

            loader.classList.remove("hidden");
            try 
             {
                const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
                const data = await res.json();
                
                if (data.data)
                
                {
                    issueCountDisplay.innerText = `${data.data.length} Issues Found`;
                    renderIssues(data.data);
                }
            } 
            catch (error)

             {
                console.error("Search error:", error);
            } 
            finally 
            
            {
                loader.classList.add("hidden");
            }
        }

