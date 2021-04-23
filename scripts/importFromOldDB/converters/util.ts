export function generateListString(input: {
    L?: [
        {
            S?: string
        }
    ]
}): string[]{
    const result: string[] = [];
    input?.L?.forEach((item) => {
        if(item.S){
            try{
                if (item.S.match(/S=/)) {
                    const obj = item.S.split('=')[1].slice(0, -1);
                    result.push(obj);
                } else {
                    const obj = item.S
                    result.push(obj);
                }
            } catch(e) {
                console.error(e.message);
            }

        }
    })
    return result;
}