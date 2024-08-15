class PhoneNumber extends HTMLInputElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.setDefaultAttr()
        this.onInputHandle()
    }
    setDefaultAttr() {
        if (!(this.type == "text")) this.type = "text"
        if (!(this.maxLength >= 1)) this.maxLength = 14
        if (!(this.minLength >= 1)) this.minLength = this.minLength = 12
    }
    onlyNumberAllowed() {
        const numberRegex = new RegExp(/^\d+$/)
        const isValid = numberRegex.test(this.value)
        if (!isValid) this.setCustomValidity("Nomer HP harus berupa angka.")
        return isValid
    }
    isLengthValid() {
        const isValid = this.value.length >= this.minLength && this.value.length <= this.maxLength
        if (!isValid) this.setCustomValidity(`Nomer HP harus minimal ${this.minLength} dan tidak lebih dari ${this.maxLength}.`)
        return isValid
    }
    isPhoneNumberValid() {
        return this.onlyNumberAllowed() && this.isLengthValid()
    }
    onInputHandle() {
        this.addEventListener("input", () => {
            if (this.isPhoneNumberValid()) this.setCustomValidity("")
            if (this.value.startsWith("08") && this.value.length >= 3) this.value = `628${this.value.substring(2, this.value.length)}`
        })
    }
}

customElements.define("phone-number", PhoneNumber, { extends: "input" })