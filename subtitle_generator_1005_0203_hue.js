// 代码生成时间: 2025-10-05 02:03:24
// subtitle_generator.js
// 使用Backbone框架创建字幕生成工具

// 定义字幕模型
var SubtitleModel = Backbone.Model.extend({
    defaults: {
        'text': '',
        'startTime': 0,
        'endTime': 0
    },
    // 验证字幕时间是否合理
    validate: function(attrs) {
        if (attrs.startTime >= attrs.endTime) {
            return '开始时间必须小于结束时间';
        }
    }
});

// 定义字幕集合
var SubtitleCollection = Backbone.Collection.extend({
    model: SubtitleModel
});

// 定义字幕视图
var SubtitleView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#subtitle-template').html()),
    events: {
        'click #add-subtitle': 'addSubtitle',
        'click #generate-subtitles': 'generateSubtitles'
    },
    initialize: function() {
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'reset', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },
    addSubtitle: function() {
        var startTime = this.$('#start-time').val();
        var endTime = this.$('#end-time').val();
        var text = this.$('#subtitle-text').val();
        var subtitle = new SubtitleModel({
            startTime: parseInt(startTime),
            endTime: parseInt(endTime),
            text: text
        });
        if (!subtitle.isValid()) {
            alert(subtitle.validationError);
            return;
        }
        this.collection.add(subtitle);
    },
    generateSubtitles: function() {
        // 这里可以添加生成字幕文件的逻辑
        // 例如，将字幕集合转换为SRT格式并下载
        var srtContent = this.collection.map(function(subtitle) {
            return subtitle.get('startTime') + " --> " + subtitle.get('endTime') + "
" + subtitle.get('text') + "
";
        }).join('');
        // 创建并下载SRT文件
        var blob = new Blob([srtContent], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'subtitles.srt';
        a.click();
        URL.revokeObjectURL(url);
    }
});

// 初始化字幕集合和视图
var subtitles = new SubtitleCollection();
var subtitleView = new SubtitleView({
    el: '#subtitle-container',
    collection: subtitles
});
subtitleView.render();