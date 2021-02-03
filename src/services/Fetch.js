export default function Fetch(method, url, body={}){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var responseJsonObj = JSON.parse(this.responseText);
                
        }
    };
    
    var jsonData = {"name" : "Lokesh"};
    xmlhttp.send( JSON.stringify( jsonData ) );
}