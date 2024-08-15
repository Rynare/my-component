class InfiniteScroll extends HTMLDivElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.onIntersection()
    }
    onIntersection() {
        const intersectionObserver = new IntersectionObserver(theElements => {
            const { isIntersecting } = theElements[0]
            if (isIntersecting) this.pushEvent()
        })
        intersectionObserver.observe(this)
    }
    pushEvent() {
        const onIntersectionEvent = new Event("onIntersection")
        document.dispatchEvent(onIntersectionEvent)
    }
}
customElements.define("infinite-scroll", InfiniteScroll, { extends: "div" })