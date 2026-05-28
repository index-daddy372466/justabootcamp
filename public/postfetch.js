export default async function postFetch(url,dataset) {
    if(!url || !dataset) {
        console.error('Fetch: Check arguments');
        return;
    }
    await fetch(url, {method:'POST', headers:{'Content-Type':'Application/json'}, body:JSON.stringify(dataset)})
}