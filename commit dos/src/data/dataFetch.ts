
export const getFilms = async () => {
    try {
        const dataFilms = await fetch('https://ghibliapi.vercel.app/films').then((res) => res.json());
        console.log(dataFilms)
        return dataFilms
    } catch (error) {
        console.log('error', error)
        return error
    }
};