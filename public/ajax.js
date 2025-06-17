let ajaxImpl = (str) => {
  if (str.trim() === "") {
    // Optional: reload full table if input is empty
    // OR skip AJAX call
    return;
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let tableBody = document.getElementById("tblBody");
      tableBody.innerHTML = "";

      let jsonObj = JSON.parse(this.responseText);

      if (jsonObj.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center">No data found</td></tr>`;
        return;
      }

      jsonObj.forEach((item, index) => {
        let row = document.createElement("tr");

        let column = document.createElement("td");
        column.innerText = index + 1;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerText = item.name;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = `<a href="/delcatbyid?id=${item.id}">DELETE</a>`;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = `<a href="#">UPDATE</a>`;
        row.appendChild(column);

        tableBody.appendChild(row);
      });
    }
  };

  xhttp.open("GET", "/search?sd=" + str, true);
  xhttp.send();
};
