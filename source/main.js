class NvHttp {
    constructor(){
        this.client = new XMLHttpRequest();
        this.headers = {};
        this.endpoint = "";
    }

    /**
     * 
     * @param {Object} headersList 
     */
    setHeaders(headersList){
        this.headers = Object.assign({},this.headers,headersList);
    }
    /**
     * 
     * @param {string} endpoint 
     */
    setEndpoint(endpoint){
        this.endpoint = endpoint;
    }

    /**
     * GET request to the server
     * @return {Promise}
     */
    get(){
        return new Promise((resolve, reject) => {
            this.client.onreadystatechange = () => {
                if (this.client.readyState == 4 && this.client.status == 200) {
                    let response = this.client.response;
                    try{
                        response = JSON.parse(this.client.response);
                    }catch(e){}
                    resolve(response);
                }
            }

            this.client.open("GET", this.endpoint);
            this._setupHeaders();
            this.client.send();
        });
    }

    /**
     * Private: Setting up request headers;
     */
    _setupHeaders(){
        console.log(this.headers);
        for (const item in this.headers) {
            if(this.headers.hasOwnProperty(item)){
                this.client.setRequestHeader(`${item}`, this.headers[item]);
            }
        }
    }
}

export default NvHttp;
