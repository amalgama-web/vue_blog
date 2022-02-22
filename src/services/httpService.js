

export default {
    async getData( { url, method = 'GET', payload = {}, errorMessage = '' } ) {
        try {

            const response = await fetch(url,{
                method: method,
                body: method === 'GET' ? null : JSON.stringify(payload)
            });

            if(!response.ok) {
                // throw new Error();
            }

            const responseData = await response.json();

            return responseData;

        } catch (e) {
            return e;
        }
    }
}