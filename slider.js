class slider {
    slideIndex = 1;


    constructor(options) {
        this.options = options;
        this.intialStuff();
        this.createbtns();
        this.createdots();
        this.showslide(1);
        this.settimer();
        this.resetTime();

    }

    intialStuff() {
        let { element : sliderElement , sliderClass , auto} = this.options;
        if (! sliderElement) throw Error('slider is not exists');
        Number.isInteger(auto) ? this.auto = auto : this.auto = 0;

        this.slider = [...sliderElement.children].filter(elm => elm.classList.contains(sliderClass))
    }

    createbtns() {
        let { element : sliderElement } = this.options;

        sliderElement.insertAdjacentHTML('beforeend' , `
            <a class="next">&#10095;</a>
            <a class="prev">&#10094;</a>
        `);


        sliderElement.querySelector('.next').addEventListener('click' , () => this.plusslide())
        sliderElement.querySelector('.prev').addEventListener('click' , () => this.nagslide())
    }

    plusslide = () => {
        this.resetTime()
        this.showslide(this.slideIndex += 1) }
    nagslide = () => {
        this.resetTime()
        this.showslide(this.slideIndex -= 1) }
    currentslide = n => {
        this.resetTime()
        this.showslide(this.slideIndex = n) }

    createdots() {
        let { element : sliderElement } = this.options;

        let dotElements = [...this.slider].map((slider , index) => `<span class="dot" data-slide="${index+1}"></span>`)

        let dots = document.createElement('div')
        dots.classList.add('dots');
        dots.innerHTML = `${dotElements.join('')}`

        sliderElement.after(dots)

        this.dots = dots.querySelectorAll('.dot')
        this.dots.forEach(dot => dots.addEventListener('click' , e => this.currentslide(parseInt(e.target.dataset.slide))))
    }

    showslide(number) {
        let { element : sliderElement , sliderClass , currentslider} = this.options;

        if(number > this.slider.length) this.slideIndex = 1;
        if(number < 1 ) this.slideIndex = this.slider.length;

        sliderElement.querySelector(`.${sliderClass}.active`).classList.remove('active');
        this.dots.forEach(dot => dot.classList.remove('active'))

        this.slider[this.slideIndex - 1].classList.add('active')
        this.dots[this.slideIndex - 1].classList.add('active')

        if (currentslider) currentslider(this.slider[this.slideIndex - 1])
    }

    settimer () {
        if (this.auto != 0) {
            this.timeID = setInterval(() => this.showslide(this.slideIndex += 1) , this.auto);
        }
    }

    resetTime () {
        clearInterval(this.timeID)
        this.settimer()
    }

}
