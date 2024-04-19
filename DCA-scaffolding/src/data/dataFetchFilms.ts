
interface films{
Title: string,
OriginalTitle: string,
ReleaseDate: string,
Description: string,
Director: string,
people: [
    name:string,
    gender:string,
]
}


async function getFilms() {
    try{
        const getData = await fetch ("https://ghibliapi.vercel.app/films").then((res)=> res.json());
        const film: films[] = getData
        console.log(film);
        return film;
    }catch(error){

    }

}
export default getFilms