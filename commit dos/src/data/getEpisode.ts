export const getPeople = async (id: any) => {
    try {
        const dataPeople = await fetch(`https://ghibliapi.vercel.app/people/${id}`).then((res) => res.json());
        console.log(dataPeople)
        return dataPeople
    } catch (error) {
        console.log('error', error)
        return error
    }
};