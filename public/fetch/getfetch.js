export default async function getFetch(url,property) {
    let response;
    if(!url) {
        console.error('Fetch: Check arguments');
        return;
    }
    response = await fetch(url, {method:'GET', headers:{'Content-Type':'Application/json'}}).then(r => r.json()).then(data => {
        return data[property]||false
    })
    return response;
}