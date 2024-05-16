
const name = document.getElementById("name")
const id = document.getElementById("id")
const branch = document.getElementById("branch")
const result = document.getElementById("result")




document.getElementById("insert").addEventListener("click", () => {
  axios.post('http://localhost:3000/insert', {
    Name : name.value,
    Id : id.value,
    Branch : branch.value
  }).then((res) => {
    console.log(res)
    result.textContent = res.data
  }, (err) => {
    result.textContent = err
  }
  )
});

document.getElementById("display").addEventListener("click", () => {
  axios.get('http://localhost:3000/display').then((res) => {
    let string =''
    let arr = res.data
    createTable(arr)
  }, (err) => {
    result.textContent = err
  }
  )
});

document.getElementById("delete").addEventListener("click", () => {
  axios.post('http://localhost:3000/delete',{
    Id : id.value
  }).then((res) => {
    let string =''
    let arr = res.data
    for(let i in arr){
      string +=JSON.stringify(arr[i])+'\n'
    }
    result.textContent=string
  }, (err) => {
    result.textContent = err
  }
  )
});





function createTable(data) {
  var table = document.createElement("table");
  var thead = table.createTHead();
  var row = thead.insertRow();
  var headers = ['Name', 'ID', 'Branch'];
  headers.forEach(headerText => {
      var th = document.createElement("th");
      var text = document.createTextNode(headerText);
      th.appendChild(text);
      row.appendChild(th);
  });

  var tbody = table.createTBody();
  data.forEach(item => {
      var row = tbody.insertRow();
      row.innerHTML=`<td>${item.Name}</td><td>${item.Id}</td><td>${item.Branch}</td>`
  });
  console.log(table)
  result.append(table);
}









