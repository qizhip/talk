// 表单验证 构造函数
class FieldValidator {
    constructor(elementId, validatorFunc) {
        this.input = document.querySelector('#' + elementId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.input.onblur = () => {
            this.validate();
        }
    };

    async validate() {
        const err = await this.validatorFunc(this.input.value.trim());
        if (err) {
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = '';
            return true;
        }
    }

    static async validate(...validators) {
        const pros = validators.map((item) => item.validate());
        const result = await Promise.all(pros);
        return result.every((item) => item);
    }
}
