export const setValueInLocalStorage = (key, value) => {
    let data = value;
    if(typeof value === 'object'){
        data =  JSON.stringify(value);
    }
    if (localStorage) {
        localStorage.setItem(key, data);
    }
};
  
export const getValueFromLocalStorage = (key) => localStorage && JSON.parse(localStorage.getItem(key));
  
export const removeItemFromLocalStorage = (key) => localStorage && localStorage.removeItem(key);

export const fetchData = async(query) => {
    let url = 'https://www.alphavantage.co/query?apikey=8QDY3P1X6QJL11SR&' + query;
    let data = await fetch(url).then((response) => {return response.json()}, (err) => {return {'error':true}});
    return data;
}