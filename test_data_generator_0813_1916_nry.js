// 代码生成时间: 2025-08-13 19:16:05
// test_data_generator.js

// 使用Backbone框架创建测试数据生成器

/**
 * TestModel 定义了测试数据的模型
 * @param {Object} attributes - 模型的属性
 */
var TestModel = Backbone.Model.extend({
  // 模型属性
  defaults: {
    id: null,
    name: "",
    email: "",
    age: 0
  }
});

/**
 * TestData 集合，用于存储测试数据模型
 */
var TestData = Backbone.Collection.extend({
  // 指定集合中的模型类型
  model: TestModel
});

/**
 * TestDataGenerator 生成测试数据
 * @param {number} count - 需要生成的测试数据数量
 */
var TestDataGenerator = function(count) {
  // 检查输入参数是否合法
  if (typeof count !== 'number' || count < 0) {
    throw new Error("Invalid count value. It must be a non-negative number.");
  }

  // 创建测试数据集合
  var testDataCollection = new TestData();

  // 生成测试数据
  for (var i = 0; i < count; i++) {
    testDataCollection.add({
      id: i + 1,
      name: "Test User " + (i + 1),
      email: "testuser" + (i + 1) + "@example.com",
      age: Math.floor(Math.random() * 100) + 18 // 年龄在18到118之间
    });
  }

  // 返回生成的测试数据集合
  return testDataCollection;
};

// 示例：生成10条测试数据并输出
try {
  var generatedData = TestDataGenerator(10);
  generatedData.each(function(model) {
    console.log(model.toJSON());
  });
} catch (error) {
  console.error(error.message);
}