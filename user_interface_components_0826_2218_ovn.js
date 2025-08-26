// 代码生成时间: 2025-08-26 22:18:57
// 引入Backbone框架
var Backbone = require('backbone');

// 定义基础组件类
class BaseComponent extends Backbone.View {
    constructor(options) {
        super(options);
        this.template = options.template;
    }
    
    // 渲染组件
    render() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
}

// 定义具体组件
class ButtonComponent extends BaseComponent {
    constructor(options) {
        super(options);
        this.template = _.template('<button><%= text %></button>');
    }
}

class InputComponent extends BaseComponent {
    constructor(options) {
        super(options);
        this.template = _.template('<input type="<%= type %>" value="<%= value %>">');
    }
}

class SelectComponent extends BaseComponent {
    constructor(options) {
        super(options);
        this.template = _.template('<select><%% _.each(options, function(option) { %%><option value="<%= option.value %>"><%= option.text %></option><% }); %%></select>');
    }
}

// 组件库
const UIComponents = {
    ButtonComponent,
    InputComponent,
    SelectComponent
};

// 导出组件库
module.exports = UIComponents;
