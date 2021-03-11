//Send y Receive Json data through ajax

export default function Fetch(method, url, body = {}, token = "", action = {}) {
  let urlRoot = "https://alkemy-back-api.herokuapp.com/" + url; //Cambiar a la url donde se alojara la API
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, urlRoot, true);

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      typeof action == "function" && action(JSON.parse(this.responseText));
    }
    if (this.readyState == 4 && this.status == 413) {
      action(JSON.parse(this.responseText));
    }
  };
  xmlhttp.setRequestHeader("token", token);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(body));
}
