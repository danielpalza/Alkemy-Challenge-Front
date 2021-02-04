export default function Fetch(method, url, body = {}, token = "", action = {}) {
  let urlRoot = "http://localhost:4000" + url; //Cambiar a la url donde se alojara la API
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, urlRoot, true);
  console.log("fetch:", body, action);

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      typeof action == "function" && action(JSON.parse(this.responseText));
    }
    if (this.readyState == 4 && this.status == 413) {
      action({ status: "Error" });
    }
  };
  xmlhttp.setRequestHeader("token", token);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(body));
}
