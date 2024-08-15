class AutoSaveForm extends HTMLFormElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if (!this.id) this.id = `ry-form`
        if (localStorage.getItem(this.id)) {
            this.loadForm()
        }
        this.checkChildWithoutName()
        this.allHandle()
    }
    checkChildWithoutName() {
        const elementWithoutName = this.querySelectorAll(':not([name])')
        if (elementWithoutName.length >= 1) {
            console.error(`Terdapat ${elementWithoutName.length} element didalam form yang tidak memiliki attribut "name"`)
        }
    }
    saveForm() {
        const formData = new FormData(this)
        const datas = []
        formData.forEach((value, name) => {
            const tag = this.querySelector(`[name=${name}]`).tagName.toLowerCase()
            const type = this.querySelector(`[name=${name}]`).getAttribute("type").toLowerCase()
            datas.push({
                tag,
                type,
                name,
                value
            })
        });
        localStorage.setItem(this.id, JSON.stringify(datas))
    }
    loadForm() {
        try {
            if (localStorage.getItem(this.id)) {
                const datas = JSON.parse(localStorage.getItem(this.id))
                datas.forEach(data => {
                    if (data.tag === "input") {
                        if (data.type === "radio") {
                            this.querySelector(`[value=${value}][name=${data.name}]`).checked = true;
                        } else if (data.type === "checkbox") {
                            this.querySelector(`[value=${value}][name=${data.name}]`).checked = true;
                        } else {
                            this.querySelector(`[name=${data.name}]`).value = data.value;
                        }
                    } else {
                        this.querySelector(`${data.tag}[name=${data.name}]`).value = data.value;
                    }
                })
            }
        } catch (error) {
            console.error("Form tidak dapat memuat data tersimpan.")
        }
    }
    allHandle() {
        this.addEventListener("change", () => {
            this.saveForm()
        })
        this.addEventListener("input", () => {
            this.saveForm()
        })
        this.addEventListener("submit", () => {
            this.saveForm()
        })
    }
}
customElements.define("auto-save-form", AutoSaveForm, { extends: "form" })