class deviceTheme extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.setDefaultState()
        this.runAutoDetect()
    }
    static observedAttributes = ["current-theme"];
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "current-theme" && ['light', "dark", "default"].includes((newValue || "").toLowerCase())) {
            if (newValue.toLowerCase() === "default") {
                this.pushEvent(this.getDeviceTheme())
            } else if (['light', "dark"].includes(newValue.toLowerCase())) {
                this.pushEvent(newValue)
            }
        }
    }
    getDeviceTheme() {
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        return isDarkMode ? "dark" : "light"
    }
    setDefaultState() {
        if (!this.getAttribute("current-theme")) {
            this.setAttribute("current-theme", "default")
        }
    }
    runAutoDetect() {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ev => {
            if (this.getAttribute("current-theme") === "default") {
                this.pushEvent(this.getDeviceTheme())
            }
        })
    }
    pushEvent(themeMode) {
        const themeChangeEvent = new CustomEvent("theme-changed", { detail: { theme: themeMode } })
        this.dispatchEvent(themeChangeEvent)
    }
}

customElements.define("device-theme", deviceTheme)