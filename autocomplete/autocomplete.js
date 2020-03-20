function AutoComplete() {
    let jsonStorage = ''
    let getAjax = (ele) => {
        let linkApi = getAttrLinkApi(ele)
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let json = this.responseText.data
                setLocalStorage(linkApi, json)
                jsonStorage = JSON.stringify(json);
                console.log(jsonStorage)
                setAttributeOnChange(ele)


            }
        };
        xhttp.open("GET", linkApi, true);
        xhttp.send();
    }
    /** 
     *  storage 
    */
    let setLocalStorage = (linkApi, json) => {
        localStorage.setItem(linkApi, JSON.stringify(json));
    }
    let getLocalStorage = (key) => {
        let json = JSON.parse(localStorage.getItem(key));
        return json;
    }
     /** 
     *  storage 
    */
    let getAttrLinkApi = (ele) => {
        let linkApi = ele.getAttribute("link");
        return linkApi;
    }
    let getAttrList = (ele) => {
        let list = ele.getAttribute("list");
        return list;
    }
    let isCheckIsset = (linkApi) => {
        let check = false;
        if (localStorage.getItem(linkApi)) {
            check = true;
        }
        return check;
    }
    let addDataList = (ele) => {
        dl = document.createElement('datalist');
        dl.id =getAttrList(ele);

        ele.appendChild(dl)
    }
    let setAttributeOnChange = (ele) => {
        ele.addEventListener('keyup', (event) => {
            var strChange = event.target.value;
            var newArray = jsonStorage.filter(function (item) {
                return Object.values(item)[1].toLowerCase().includes(strChange.toLowerCase());
            });
            let li_html = '';
            li_html += newArray.map(function (icd10, index) {
                if(index<10){
                    return " <option class='list-group-item' data-id='" + icd10.id + "' data-code-truoc='" + icd10.disease_code + "'onclick='addTruocPhauThuat(this)'>" + icd10.disease_name_vn + " </option>";
                }
            }).join('');

            document.getElementById(getAttrList(ele)).innerHTML = li_html
        });
    }
    this.active = (ele) => {
        //đổ datalist 
        addDataList(ele)
        //lây link api từ ele
        let linkApi = getAttrLinkApi(ele)
        //kiểm tra xem đã tồn tại trong storage 
        let checkIsset = isCheckIsset(linkApi)
        
        if(checkIsset){
            let data = getLocalStorage(linkApi)
            jsonStorage = data ;
            setAttributeOnChange(ele) 
        }else{
            getAjax(ele)
        }
        
    }

    


}