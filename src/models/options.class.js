export default class Options {


    constructor(data) {
        this.rand1 = (Math.floor(Math.random() * data.length));
        this.rand2 = (Math.floor(Math.random() * data.length));
        this.rand3 = (Math.floor(Math.random() * data.length));
        this.rand4 = (Math.floor(Math.random() * data.length));
        this.c = (Math.floor(Math.random() * 4));
        this.opts = [
            {
                country: data[this.rand1].name.official,
                flag: data[this.rand1].flags.png,
                capital: data[this.rand1].capital[0]
            }, {
                country: data[this.rand2].name.official,
                flag: data[this.rand2].flags.png,
                capital: data[this.rand2].capital[0]
            }, {
                country: data[this.rand3].name.official,
                flag: data[this.rand3].flags.png,
                capital: data[this.rand3].capital[0]
            }, {
                country: data[this.rand4].name.official,
                flag: data[this.rand4].flags.png,
                capital: data[this.rand4].capital[0]
            }
        ];

    }

    getCorrect() {
        return this.opts[this.c]
    }

}