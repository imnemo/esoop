const {assert} = require('chai');
const { Base } = require('./../index')

let unitTestClassFunc = (ClassClass) => {
  let className = ClassClass.name
  describe(`New ${className}`, function () {
    it('Should return a new instance by null option', function() {
      let ins = new ClassClass()
      assert.equal(ins instanceof ClassClass, true)
    })
    it('Should return a new instance by option', function() {
      let ins = new ClassClass({a: 1, b: 2})
      assert.deepEqual(ins.option, {a: 1, b: 2})
    })
  })

  describe('Set option', function(){
    it('Should setOptions after instance constructed', function(){
      let ins = new ClassClass()
      ins.setOptions({a: 1, b: 2, c: {foo: 'bar'}, d: [1, 2]}, true)
      assert.deepEqual(ins.option, {a: 1, b: 2, c: {foo: 'bar'}, d: [1, 2]})
    })

    let ins
    before(function(){
      ins = new ClassClass({a: 1, b: 2, c: {foo: 'bar'}, d: [1, 2]})
    })
    it('Should setOption by an object', function(){
      assert.equal(ins.option.c.foo, 'bar')
      ins.setOption({c: {foo: 'foo'}})
      assert.equal(ins.option.c.foo, 'foo')
    })
    it('Should setOption by key&value', function(){
      assert.deepEqual(ins.option.d, [1, 2])
      ins.setOption('d', [2, 3])
      assert.deepEqual(ins.option.d, [2, 3])
    })
  })

  describe('Set option deeply', function() {
    let ins
    beforeEach(function(){
      ins = new ClassClass({e: [1, {hello: 'world'}]})
      assert.deepEqual(ins.option.e, [1, {hello: 'world'}])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [2])
      assert.deepEqual(ins.option.e, [2, {hello: 'world'}])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [1, 2])
      assert.deepEqual(ins.option.e, [1, 2])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [1, {hello: 'magicare'}])
      assert.deepEqual(ins.option.e, [1, {hello: 'magicare'}])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [1, {hello: 'magicare'}])
      assert.deepEqual(ins.option.e, [1, {hello: 'magicare'}])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [1, {hello: 'magicare', foo: 'bar'}])
      assert.deepEqual(ins.option.e, [1, {hello: 'magicare', foo: 'bar'}])
    })
    it('Should mergeOption object in an array', function(){
      ins.setOption('e', [1, {hello: 'magicare'}, 3])
      assert.deepEqual(ins.option.e, [1, {hello: 'magicare'}, 3])
    })
  })
}

//测试Hardwre基类
describe('Base Class Base', function() {
  unitTestClassFunc(Base)
})

//测试Base子类
describe('Sub Class of Base', function() {
  unitTestClassFunc(class SubClass extends Base {})
})

//测试下类方法的继承与重载？
