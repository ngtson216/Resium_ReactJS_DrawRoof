import xmlF from '../AjaxXML/squaw_creek_container_info.xml';

function AjaxXML() {
    var myAjax = new XMLHttpRequest();
    myAjax.open("GET", xmlF, false);
    myAjax.setRequestHeader("Content-Type", "text/xml");
    myAjax.send(null);
    var xmlDocument = myAjax.responseXML;
    var po = xmlDocument.getElementsByTagName("POINT");
    var li = xmlDocument.getElementsByTagName("LINE");
    var plg = xmlDocument.getElementsByTagName("POLYGON");
    var ajax = {
        po: po,
        li: li,
        plg: plg,
    }
    return ajax
}

export default AjaxXML;