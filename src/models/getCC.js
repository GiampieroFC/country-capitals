
export default async function getCC() {
    const dw = await fetch('https://restcountries.com/v3.1/all');
    const jn = await dw.json();

    return jn
};
